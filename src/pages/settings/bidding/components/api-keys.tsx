import { useState } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { freelancerService } from '@/services/freelancer.service';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const ApiKeys = ({ data, onChange }: { data?: any, onChange?: (field: string, val: any) => void }) => {
  const [showSecret, setShowSecret] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefreshConnection = async () => {
    try {
      setRefreshing(true);
      const response = await freelancerService.getFreelancerAuthorizeUrl();

      if (response.success && response.data?.url) {
        let authUrl = response.data.url;
        try {
          const urlObj = new URL(authUrl);
          const redirectUri = urlObj.searchParams.get('redirect_uri');
          if (redirectUri) {
            // Ensure the redirect URI points to the current environment (e.g., localhost)
            const urlPath = new URL(redirectUri).pathname;
            const newRedirect = window.location.origin + urlPath;
            urlObj.searchParams.set('redirect_uri', newRedirect);
            authUrl = urlObj.toString();
          }
        } catch (e) {
          // Fallback to original url if parsing fails
        }
        window.location.href = authUrl;
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to get Freelancer authorization URL');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="bg-success/10 border-b border-success/30 rounded-t-xl px-5 py-3">
        <CardTitle className="text-success text-base">Freelancer API Keys</CardTitle>
      </CardHeader>
      <CardContent className="p-5 grid gap-5">
        <div className="grid gap-1.5">
          <Label className="text-sm font-medium text-secondary-foreground">Client ID</Label>
          <Input
            value={data?.clientId || ''}
            onChange={(e) => onChange?.('clientId', e.target.value)}
            className="font-mono text-sm"
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="text-sm font-medium text-secondary-foreground">Client Secret</Label>
          <div className="relative">
            <Input
              type={showSecret ? 'text' : 'password'}
              value={data?.clientSecret || ''}
              onChange={(e) => onChange?.('clientSecret', e.target.value)}
              className="font-mono text-sm pe-10"
            />
            <Button
              variant="ghost"
              mode="icon"
              size="sm"
              className="absolute end-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setShowSecret(!showSecret)}
            >
              {showSecret ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
          </div>
        </div>
        <Button
          variant="primary"
          className="w-full gap-2"
          onClick={handleRefreshConnection}
          disabled={refreshing}
        >
          {refreshing ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
          Refresh Connection
        </Button>
      </CardContent>
    </Card>
  );
};

export { ApiKeys };
