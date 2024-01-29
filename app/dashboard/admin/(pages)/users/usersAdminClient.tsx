
"use client";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import Container from "@/app/components/Container";
import { SafeListing, SafeUser } from "@/app/types";
import { Users } from "@/app/actions/getUsers";

interface PropertiesClientProps {
    users: Users[];
    listings: SafeListing[];
  isAdmin?: SafeUser | null;
}

const UsersClient: React.FC<PropertiesClientProps> = ({listings, users, isAdmin }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("active"); // "active" or "sold"
  const usersPerPage = 10;


  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/users/${id}`)
        .then(() => {
          toast.success("User deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

// Filter users based on availability
const filteredUsers = users.filter((user) => {
    const hasRent = user.forrent && user.forrent.length > 0;
    const hasSale = user.forSale && user.forSale.length > 0;
  
    if (activeTab === "active") {
      return hasRent || hasSale;
    } else if (activeTab === "sold") {
      return !(hasRent || hasSale);
    }
  
    // Default to showing all users if the tab is not specified
    return true;
  });
  

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <Container>
       <div className="relative mt-24">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
        </div>

      <div className="flex items-center justify-center space-x-4">
          <div
            className={`cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md ${
              activeTab === "active" ? "opacity-100" : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active Users
          </div>
          <div
            className={`cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md ${
              activeTab === "sold" ? "opacity-100" : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setActiveTab("sold")}
          >
            Inactive users
          </div>
        </div>



      <div className="relative py-4 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

          


            <tr>
              <th scope="col" className="p-4">
               Users Name
              </th>
              <th scope="col" className="p-4">
               Rents
              </th>
              <th scope="col" className="p-4">
                Sales
              </th>
              <th scope="col" className="p-4">
                Joined
              </th>
              <th scope="col" className="p-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
        {currentUsers.map((user: any) => {
           
          const rentCount = user.forrent ? user.forrent.length : 0;
          const saleCount = user.forSale ? user.forSale.length : 0;

          return (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {rentCount}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {saleCount}
              </td>
<td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</td>

              <td className="px-6 py-4">
                <div className="flex items-center">
                  <FaEdit
                    className="cursor-pointer text-blue-600 hover:text-blue-800 mr-2"
                  />
                  <FaTrash
                    onClick={() => onDelete(user.id)}
                    className="cursor-pointer text-red-600 hover:text-red-800"
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
        </table>

        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            {filteredUsers.length > 0
              ? `Showing ${indexOfFirstUser + 1}-${Math.min(
                  indexOfLastUser,
                  filteredUsers.length
                )} of ${filteredUsers.length}`
              : "No results"}
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === 1 || filteredUsers.length === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                onClick={() => {
                  if (currentPage > 1 && filteredUsers.length > 0) {
                    paginate(currentPage - 1);
                  }
                }}
              >
                Previous
              </a>
            </li>

            {filteredUsers.length > 0 &&
              Array.from({ length: totalPages }).map((_, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      currentPage === index + 1
                        ? "text-blue-600 border border-gray-300 bg-blue-50"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}

            <li>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === totalPages || filteredUsers.length === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                onClick={() => {
                  if (currentPage < totalPages && filteredUsers.length > 0) {
                    paginate(currentPage + 1);
                  }
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default UsersClient;
