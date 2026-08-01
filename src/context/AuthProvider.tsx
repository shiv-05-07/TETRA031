import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  role: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  logActivity: (action: string, metadata?: any) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };

  const logActivity = async (action: string, metadata?: any) => {
    if (!user) return;
    const { error } = await supabase.from('activities').insert([
      {
        user_id: user.id,
        action,
        metadata: metadata || {},
        user_agent: navigator.userAgent,
      },
    ]);
    if (error) {
      console.error('Error logging activity:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
        setIsLoading(false);
      }
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          await fetchProfile(newSession.user.id);
          
          if (_event === 'SIGNED_IN') {
             logActivity('login', { provider: newSession.user.app_metadata.provider });
          }
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await logActivity('logout');
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, isLoading, logActivity, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
