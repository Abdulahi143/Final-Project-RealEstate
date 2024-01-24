import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeUser } from "@/app/types";
import getUsers from "@/app/actions/getUsers";
import UsersClient from "./usersAdminClient";

const UsersPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    );
  }


  const isAdmin: SafeUser | null = currentUser.isAdmin ? currentUser : null;

  if (!isAdmin) {
    return (
      <EmptyState
        title="You are not admin😢"
        subtitle="Adios👋"
      />
    );
  }

  const users = await getUsers();

  if (!users || users.length === 0) {
    return (
      <>
        <ClientOnly>
          <EmptyState
            title="No users found"
            subtitle="Looks like there are no users registered yet."
          />
        </ClientOnly>
      </>
    );
  }

  return (
    <>
      <ClientOnly>
        <UsersClient isAdmin={isAdmin} users={users} listings={[]} />
      </ClientOnly>
    </>
  );
};

export default UsersPage;
