"use client"


import { SafeListing} from "@/app/types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { IListingsParams } from "../actions/getListings";



interface SalesClientProps {
    listings: SafeListing[];
    getListings: IListingsParams;
}

const SalesClient = ({listings, getListings}: SalesClientProps) => {
    const allListings = 
console.log("listings", listings)
    return ( 
        <Container>
            <Heading
        title="Sales"
        subtitle="Lists of all sales"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
         
      </div>

        </Container>
    );
}
 
export default SalesClient;