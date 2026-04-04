import React from 'react';
import { useDroppable } from '@dnd-kit/react';
import type { TabSetNode } from '../model/TabSetNode';

export const DndKitTabSetWrapper: React.FC<{ node: TabSetNode; children?: React.ReactNode }> = ({ node, children }) => {
  // This tells the blanket "I can hold toys!"
  const { ref: setNodeRef } = useDroppable({ id: node.getId() });

  return (
    <div ref={setNodeRef as any}>
      {children}
    </div>
  );
};

export default DndKitTabSetWrapper;
