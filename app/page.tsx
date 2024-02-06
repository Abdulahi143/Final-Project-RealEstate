import React from "react";
import Container from "@/app/components/Container";

import ClientOnly from "./components/ClientOnly";
import Hero from "./components/hero/Hero";
import getListings, { IListingsParams } from "./actions/getListings";
import TeamSection from "./components/team/team";
import HomeListing from "./components/HomeListings";
import ContactSection from "./components/contact/ContactSection";
import getCurrentUser from "./actions/getCurrentUser";

const Home = async () => {

  const listings = await getListings({});
  const currentUser = await getCurrentUser();


  return (
    <>
      <Hero />
      <ClientOnly>
        <Container>
          <HomeListing
          listings={listings}
        currentUser={currentUser} />
        </Container>
      </ClientOnly>
      <TeamSection />
      <ClientOnly>
      <ContactSection />

      </ClientOnly>
    </>
  );
};

export default Home;
