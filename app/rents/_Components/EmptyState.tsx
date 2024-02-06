'use client';

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import { useRouter } from "next/navigation";



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