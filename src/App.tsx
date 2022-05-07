import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import cato from './images/cato.png';
import gary from './images/gary.png';
import kvn from './images/kvn.png';
import mooncake from './images/mooncake.png';
import quinn from './images/quinn.png';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: gary,
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: cato,
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: kvn,
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: mooncake,
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: quinn,
  },
];

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    console.log(result);
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='characters'>
            {(provided) => (
              <ul
                className='characters'
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <div className='characters-thumb'>
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <p>
        Images from{' '}
        <a href='https://final-space.fandom.com/wiki/Final_Space_Wiki'>
          Final Space Wiki
        </a>
      </p>
    </div>
  );
}

export default App;
