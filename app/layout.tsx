import { Nunito } from 'next/font/google';
import Navbar from '@/app/components/navbar/Navbar';
import ToasterProvider from '@/app/providers/ToasterProvider';
import './globals.css';
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';
import LoginModal from './components/Modals/LoginModal';
import RegisterModal from './components/Modals/RegisterModal';
import SearchModal from './components/Modals/SearchModal';
import RentModal from './components/Modals/RentModal';
import RentOrSellModal from './components/Modals/RentOrSellModal';
import SellModal from './components/Modals/SellModal';
import Footer from './components/footer/Footer';

export const metadata = {
  title: 'Dugsiiye Real Estate',
  description: 'Final project on my bootcamp courses in web dev at Dugsiiye.com',
};

const font = Nunito({
  subsets: ['latin'],
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
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <SearchModal />
            <RentModal />
            <SellModal />
            <RentOrSellModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <div className="flex-grow pb-20 pt-28">{children}</div>
          <Footer />
      </body>
    </html>
  );
}
