import React, { createRef, useEffect, useState } from 'react';
import './TinderCard.css';

import { Gesture, GestureConfig, createGesture, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

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

interface TinderCardProps {
  zIndex: number;
  cardState: TinderCardState;
  onSwipeLeft: (state: TinderCardState) => void;
  onSwipeRight: (state: TinderCardState) => void;
}

const TinderCard: React.FC<TinderCardProps> = ({zIndex, cardState, onSwipeLeft, onSwipeRight}) => {

  const elementRef = createRef<HTMLIonCardElement>();
  const windowWidth = window.innerWidth;

  const [swipeGesture, setSwipeGesture] = useState<Gesture|null>(null);
  const [transitionStyle, setTransitionStyle] = useState('');
  const [transformStyle, setTransformStyle] = useState('');

  const [showDetails, setShowDetails] = useState(false);
  const [tapStart, setTapStart] = useState(new Date());
  const [cancelTap, setCancelTap] = useState(false);

  useEffect(() => {
    if (elementRef.current !== null && swipeGesture === null) {
      const options: GestureConfig = {
        el: elementRef.current,
        gestureName: 'swipe',
        disableScroll: true,
        threshold: 5,
        onStart: () => {
          setTransitionStyle('none');
          setCancelTap(true);
        },
        onMove: (ev) => {
          setTransformStyle(`translateX(${ev.deltaX}px) rotate(${ev.deltaX/20}deg)`);
        },
        onEnd: (ev) => {
          setTransitionStyle('0.3s ease-out');

          if (ev.deltaX > windowWidth/2){
            onSwipeRight(cardState);
          } else if (ev.deltaX < -windowWidth/2){
            onSwipeLeft(cardState);
          } else {
            setTransformStyle('');
          }
        }
      };
      
      const newGesture = createGesture(options);
      setSwipeGesture(newGesture);
      newGesture.enable();
    }
  // eslint-disable-next-line
  }, [elementRef, swipeGesture, windowWidth, cardState]);

  useEffect(() => {
    if (cardState.status === 'hate' && elementRef.current !== null) {
      setTransitionStyle('0.3s ease-out');
      setTransformStyle(`translateX(-${windowWidth * 1.5}px) rotate(-20deg)`);
    }
    if (cardState.status === 'like' && elementRef.current !== null) {
      setTransitionStyle('0.3s ease-out');
      setTransformStyle(`translateX(${windowWidth * 1.5}px) rotate(20deg)`);
    }
  }, [cardState.status, elementRef, windowWidth]);

  function onTouchStart() {
    setCancelTap(false);
    setTapStart(new Date());
  }

  function onTouchEnd() {
    if (!cancelTap && (new Date().getTime() - tapStart.getTime()) < 100) {
      setShowDetails(!showDetails);
    }
  }

  return (
    <IonCard className="tinder-card" ref={elementRef} style={{transition: transitionStyle, transform: transformStyle, zIndex: zIndex}} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <img className="tinder-card-image" src={cardState.image169} alt=""/>
      <div style={{height: showDetails ? 340 : 250, overflow: 'scroll'}}>
        <IonCardHeader>
          <IonCardTitle>{cardState.title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {cardState.teasertext}
          {showDetails && (
            <div>
              <hr/>
              <h1>Zutaten</h1>
              <ul>
                {cardState.ingredients.map((ingredient, index) => <li key={index}>{ingredient.text}</li>)}
              </ul>
            </div>
          )}
        </IonCardContent>
      </div>
    </IonCard>
  );
};

export default TinderCard;
