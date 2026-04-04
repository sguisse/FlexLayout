import React from 'react';
import { useDraggable } from '@dnd-kit/react';
import type { TabNode } from '../model/TabNode';

export const DndKitTabWrapper: React.FC<{ node: TabNode; children?: React.ReactNode; useDndKit?: boolean }> = ({ node, children, useDndKit = true }) => {
  // Put a sticker on it so we can pick it up!
  // useDraggable provides a ref callback - attach to the wrapper div
  const { ref: setNodeRef } = useDraggable({ id: node.getId() });

  // Prevent the legacy HTML dragstart from firing when using dnd-kit
  const onDragStartCapture = (e: React.DragEvent) => {
    if (useDndKit) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div ref={setNodeRef as any} onDragStartCapture={onDragStartCapture}>
      {children}
    </div>
  );
};

export default DndKitTabWrapper;
