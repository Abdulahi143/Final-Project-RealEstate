import { Nunito } from "next/font/google";
import Navbar from "@/app/components/navbar/Navbar";
import ToasterProvider from "@/app/providers/ToasterProvider";
import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import RentModal from "./components/Modals/RentModal";
import RentOrSellModal from "./components/Modals/RentOrSellModal";
import SellModal from "./components/Modals/SellModal";
import ContactModal from "./components/Modals/ContactModal";
import MessageModal from "./components/Modals/SuccessFullyMoal";
import NextAuthProvider from "./providers/NextAuthProvider";
import FootersManagement from "./Footers";
import PaymentModal from "./components/Modals/PaymentModal";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import EditModal from "./components/Modals/EditModal";
import getListings from "./actions/getListings";
import getRentListingsById from "./actions/getRentListingById";

export const metadata = {
  title: "Dugsiiye Real Estate",
  description:
    "Final project on my bootcamp courses in web dev at Dugsiiye.com",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
          <NextAuthProvider>
            <Navbar currentUser={currentUser} />
            <ClientOnly>
              <ToasterProvider />
              <LoginModal />
              <RegisterModal />
              <RentModal />
              <SellModal />
              <EditModal  />
              <RentOrSellModal />
              <ContactModal />
              <MessageModal />
              <PaymentModal />
            </ClientOnly>
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>

            <FootersManagement />
          </NextAuthProvider>
      </body>
    </html>
  );
}
