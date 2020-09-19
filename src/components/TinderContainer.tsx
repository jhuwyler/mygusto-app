import { IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { heart, close } from 'ionicons/icons';
import axios from 'axios';
import './TinderContainer.css';

import TinderCard from './TinderCard';
import { baseURL } from '../config';

interface Ingredient {
  text: string;
}

interface TinderCardState {
  id: number;
  status: string;
  title: string;
  teasertext: string;
  image169: string;
  ingredients: Ingredient[];
}

const TinderContainer: React.FC = () => {

  const [cards, setCards] = useState<TinderCardState[]>([]);

  async function fetchCards() {
    const result = await axios.post(baseURL + '/recipe/next', {
      gluten_intolerant: true,
      lactose_intolerant: true
    });
    setCards(cards => [...cards, {
      id: result.data.id,
      status: 'none',
      title: result.data.title,
      teasertext: result.data.teasertext,
      image169: result.data.images['16:9'],
      ingredients: result.data.ingredients.map((ingredient: any) => ({
        text: ingredient.text,
      }))
    }])
  }

  useEffect(() => {
    fetchCards();
    fetchCards();
    fetchCards();
  // eslint-disable-next-line
  }, []);

  function likeCurrentCard() {
    setCards(cards => {
      const currentIndex = cards.findIndex(card => card.status === 'none');
      if (currentIndex < 0) {
        return cards;
      }
      axios.post(baseURL + '/recipe/liked', {
        recipe_id: cards[currentIndex].id,
        sentiment: 'liked',
      })
      return cards.map((card, cardIndex) => {
        if (cardIndex === currentIndex) {
          card.status = 'like';
        }
        return card;
      });
    });
    fetchCards();
  }

  function hateCurrentCard() {
    setCards(cards => {
      const currentIndex = cards.findIndex(card => card.status === 'none');
      if (currentIndex < 0) {
        return cards;
      }
      axios.post(baseURL + '/recipe/liked', {
        recipe_id: cards[currentIndex].id,
        sentiment: 'disliked',
      })
      return cards.map((card, cardIndex) => {
        if (cardIndex === currentIndex) {
          card.status = 'hate';
        }
        return card;
      });
    });
    fetchCards();
  }

  function onSwipeLeft(card: TinderCardState) {
    setCards(cards => cards.map((c) => {
      if (c.id === card.id) {
        c.status = 'hate';
      }
      return c;
    }));
    axios.post(baseURL + '/recipe/liked', {
      recipe_id: card.id,
      sentiment: 'disliked',
    })
    fetchCards();
  }

  function onSwipeRight(card: TinderCardState) {
    setCards(cards => cards.map((c) => {
      if (c.id === card.id) {
        c.status = 'like';
      }
      return c;
    }));
    axios.post(baseURL + '/recipe/liked', {
      recipe_id: card.id,
      sentiment: 'liked',
    })
    fetchCards();
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
        <IonButton shape="round" size="large" color="danger" onClick={hateCurrentCard}>
          <IonIcon slot="icon-only" icon={close} />
        </IonButton>
        <IonButton shape="round" size="large" color="success" onClick={likeCurrentCard}>
          <IonIcon slot="icon-only" icon={heart} />
        </IonButton>
      </div>}
      {cardsLeft === 0 &&
        <IonCard>
          <IonCardContent>
            Mehr Rezepte sind unterwegs ;)
          </IonCardContent>
        </IonCard>
      }
    </div>
  );
};

export default TinderContainer;
