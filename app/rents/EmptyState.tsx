'use client';

import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import Button from "../components/Button";


interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const RentsEmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset
}) => {
  const router = useRouter();

  return ( 
    <div 
      className="
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
        text-right  // This aligns text to the right
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push('/rents/')}
          />
        )}
      </div>
    </div>
   );
}
 
export default RentsEmptyState;