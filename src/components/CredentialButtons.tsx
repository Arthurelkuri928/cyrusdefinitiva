
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToolCredential } from "@/hooks/use-tool-credentials";

interface CredentialButtonsProps {
  credentials: ToolCredential[];
}

const CredentialButtons = ({ credentials }: CredentialButtonsProps) => {
  const { toast } = useToast();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const handleCopy = (value: string, label: string, index: number) => {
    navigator.clipboard.writeText(value);
    
    // Update copied state for this button
    setCopiedStates(prev => ({
      ...prev,
      [`${label}-${index}`]: true
    }));
    
    // Show toast notification
    toast({
      title: "Copiado com sucesso!",
      description: `${label} foi copiado para a área de transferência.`,
      duration: 3000
    });
    
    // Reset state after 2 seconds
    setTimeout(() => {
      setCopiedStates(prev => ({
        ...prev,
        [`${label}-${index}`]: false
      }));
    }, 2000);
  };

  if (!credentials || credentials.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-3">
      <h3 className="text-lg font-medium mb-3">Credenciais da Ferramenta</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {credentials.map((credential, index) => (
          <Button
            key={`${credential.label}-${index}`}
            variant="purpleDark"
            size="lg"
            className="w-full"
            onClick={() => handleCopy(credential.value, credential.label, index)}
          >
            {copiedStates[`${credential.label}-${index}`] ? (
              <>
                <Check className="mr-2 h-5 w-5" /> Copiado!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-5 w-5" /> {credential.label}
              </>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CredentialButtons;
