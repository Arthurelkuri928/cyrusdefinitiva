
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type ToolCredential = {
  type: string;
  label: string;
  value: string;
};

export const useToolCredentials = (toolId: string | number) => {
  const [credentials, setCredentials] = useState<ToolCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    const fetchCredentials = async () => {
      if (!session) {
        setError("Usuário não autenticado");
        setLoading(false);
        return;
      }

      // If no toolId is provided or empty string, return empty credentials
      if (!toolId) {
        setCredentials([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('tool_credentials')
          .select('credentials')
          .eq('tool_id', String(toolId)) // Always convert toolId to string for consistency
          .single();

        if (error) {
          console.error("Erro ao buscar credenciais:", error);
          setError("Erro ao carregar credenciais");
          setCredentials([]);
        } else if (data) {
          // Ensure we parse the JSON data and validate its structure
          if (data.credentials && Array.isArray(data.credentials)) {
            // Map through credentials to ensure they match our expected format
            const validatedCredentials = data.credentials
              .filter((cred: any) => 
                cred && typeof cred === 'object' && 
                'type' in cred && 
                'label' in cred && 
                'value' in cred
              )
              .map((cred: any) => ({
                type: String(cred.type),
                label: String(cred.label),
                value: String(cred.value)
              }));
            
            setCredentials(validatedCredentials);
          } else {
            setCredentials([]);
          }
        } else {
          // Nenhum dado encontrado para esta ferramenta
          setCredentials([]);
        }
      } catch (err) {
        console.error("Erro ao buscar credenciais:", err);
        setError("Erro inesperado ao carregar credenciais");
        setCredentials([]);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchCredentials();
    }
  }, [toolId, session]);

  return { credentials, loading, error };
};
