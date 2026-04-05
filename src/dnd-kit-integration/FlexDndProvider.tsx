import React from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { Actions } from '../model/Actions';
import type { Model } from '../model/Model';
import { DockLocation } from '../DockLocation';

export const FlexDndProvider: React.FC<{ model: Model; children?: React.ReactNode }> = ({ model, children }) => {
  const handleDrop = (event: any) => {
    // Uh-oh! A block dropped! Let's tell the Model!
    const { source, target } = event?.operation ?? {};
    if (target) {
      model.doAction(Actions.moveNode(source.id, target.id, DockLocation.CENTER, -1));
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDrop}>
      {children}
    </DragDropProvider>
  );
};

export default FlexDndProvider;
