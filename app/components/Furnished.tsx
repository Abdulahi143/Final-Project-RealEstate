import React from 'react';
import { FaCouch } from "react-icons/fa";

interface FurnishedComponentProps {
    furnished?: string;  // This allows the furnished prop to be string or undefined
}

const FurnishedComponent: React.FC<FurnishedComponentProps> = ({ furnished }) => {
    if (!furnished) {
        return null; // Or some default UI if furnished is not available
    }
    return (
        <div className="flex items-center gap-1">
            {furnished === 'yes' && <FaCouch />}
        </div>
    );
};

export default FurnishedComponent;
