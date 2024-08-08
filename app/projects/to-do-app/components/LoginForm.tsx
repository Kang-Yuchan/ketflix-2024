import { GithubIcon } from '@/components/icons/github-icon';
import { GoogleIcon } from '@/components/icons/google-icon';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { truncatedStr } from '@/lib/utils';
import { User } from '@/types/types';

type Props = {
  user: User;
  handleOAuthLogin: (provider: 'google' | 'github') => Promise<void>;
  handleOAuthLogout: () => Promise<void>;
};

const LoginForm = ({ user, handleOAuthLogin, handleOAuthLogout }: Props) => {
  const isLoggedIn = user && user.email;

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>
          {isLoggedIn ? (
            <div>
              Hello!
              <span className="mt-2 block text-sm">
                {truncatedStr(user.email, 30)}
              </span>
            </div>
          ) : (
            'Login'
          )}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col gap-3">
        {isLoggedIn ? (
          <Button
            onClick={handleOAuthLogout}
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Sign out
          </Button>
        ) : (
          <>
            <Button
              onClick={() => handleOAuthLogin('google')}
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            <Button
              onClick={() => handleOAuthLogin('github')}
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
