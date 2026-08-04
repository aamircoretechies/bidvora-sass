import { Fragment, useState } from 'react';
import { PageNavbar } from '@/pages/account';
import { AccountGetStartedContent } from '@/pages/account/home/get-started';
import {
  Toolbar,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { AccountDeactivatedDialog } from '@/partials/dialogs/account-deactivated-dialog';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';

export function AuthAccountDeactivatedPage() {
  const [profileModalOpen, setProfileModalOpen] = useState(true);
  const handleClose = () => {
    setProfileModalOpen(false);
  };

  return (
    <Fragment>
      <PageNavbar />
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle />
            <ToolbarDescription>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-foreground font-medium">
                  Jayson Tatum
                </span>
                <Link
                  to="mailto:support@bidvora.app"
                  className="text-secondary-foreground hover:text-primary"
                >
                  support@bidvora.app
                </Link>
                <span className="size-0.75 bg-mono/50 rounded-full"></span>
                <Button mode="link" asChild>
                  <Link to="/account/members/team-info">Personal Info</Link>
                </Button>
              </div>
            </ToolbarDescription>
          </ToolbarHeading>
        </Toolbar>
      </Container>
      <Container>
        <AccountGetStartedContent />
        <AccountDeactivatedDialog
          open={profileModalOpen}
          onOpenChange={handleClose}
        />
      </Container>
    </Fragment>
  );
}
