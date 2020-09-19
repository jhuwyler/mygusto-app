import { IonButton, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import { heart, close } from 'ionicons/icons';
import './ExploreContainer.css';

import TinderCard from './TinderCard';

interface TinderCardState {
  id: number;
  status: string;
}

const ExploreContainer: React.FC = () => {

  const [cards, setCards] = useState<TinderCardState[]>([
    {id: 1, status: 'none'},
    {id: 2, status: 'none'},
    {id: 3, status: 'none'},
    {id: 4, status: 'none'},
    {id: 5, status: 'none'},
  ]);

  function likeCurrentCard() {
    const currentIndex = cards.findIndex(card => card.status === 'none');
    if (currentIndex >= 0) {
      setCards(cards.map((card, cardIndex) => {
        if (cardIndex === currentIndex) {
          card.status = 'like';
        }
        return card;
      }));
    }
  }

  function hateCurrentCard() {
    const currentIndex = cards.findIndex(card => card.status === 'none');
    if (currentIndex >= 0) {
      setCards(cards.map((card, cardIndex) => {
        if (cardIndex === currentIndex) {
          card.status = 'hate';
        }
        return card;
      }));
    }
  }

  function onSwipeLeft(card: TinderCardState) {
    const currentIndex = cards.findIndex(c => c.id === card.id);
    if (currentIndex >= 0) {
      setCards(cards.map((card, cardIndex) => {
        if (cardIndex === currentIndex) {
          card.status = 'like';
        }
        return card;
      }));
    }
  }

  function onSwipeRight(card: TinderCardState) {
    const currentIndex = cards.findIndex(c => c.id === card.id);
    if (currentIndex >= 0) {
      setCards(cards.map((card, cardIndex) => {
        if (cardIndex === currentIndex) {
          card.status = 'hate';
        }
        return card;
      }));
    }
  }
  
  const cardsLeft = cards.filter(v => v.status === 'none').length;

  return (
    <div>
      <div className="tinder-container">
        {cards.reverse().map((card, cardIndex) => (
          <TinderCard cardState={card} key={card.id} onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}/>
        ))}
      </div>
      {cardsLeft > 0 &&
      <div className="tinder-buttons">
        <IonButton shape="round" size="large" color="success" onClick={likeCurrentCard}>
          <IonIcon slot="icon-only" icon={heart} />
        </IonButton>
        <IonButton shape="round" size="large" color="danger" onClick={hateCurrentCard}>
          <IonIcon slot="icon-only" icon={close} />
        </IonButton>
      </div>}
    </div>
  );
};

export default ExploreContainer;
