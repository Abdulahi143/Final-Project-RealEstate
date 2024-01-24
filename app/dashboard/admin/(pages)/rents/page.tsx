import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import { SafeUser } from "@/app/types";
import RentsClient from "./RentsClients";
import getUsers from "@/app/actions/getUsers";

const SalesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
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

  const [userOwnedListings, users] = await Promise.all([
    getListings({ userId: currentUser.id }),
    getUsers(),
  ]);

    if (userOwnedListings.length === 0) {
      return (
        <>
          <ClientOnly>
            <EmptyState
              title="Something went wrong😢"
              subtitle="Looks like you have no properties or you are not admin!"
            />
          </ClientOnly>
        </>
      );

    return (
      <>
        {/* <PropertiesFilterSection /> */}
        <ClientOnly>
          <RentsClient
            listings={userOwnedListings}
            isAdmin={isAdmin}
            users={users || null}
          />
        </ClientOnly>
      </>
    );
  }

  // User is an admin, fetch and display all listings
  const allListings = await getListings({});

  return (
    <>
      {/* <PropertiesFilterSection /> */}
      <ClientOnly>
        <RentsClient
          listings={allListings}
          isAdmin={isAdmin}
          users={users || null}
        />
      </ClientOnly>
    </>
  );
};

export default SalesPage;
