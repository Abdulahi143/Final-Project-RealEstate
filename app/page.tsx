import React from "react";
import Container from "@/app/components/Container";

import ClientOnly from "./components/ClientOnly";
import Hero from "./components/hero/Hero";
import { IListingsParams } from "./actions/getListings";
import TeamSection from "./components/team/team";
import HomeListing from "./components/HomeListings";
import ContactSection from "./components/contact/ContactSection";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  return (
    <>
      <Hero />
      <ClientOnly>
        <Container>
          <HomeListing searchParams={searchParams} />
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
