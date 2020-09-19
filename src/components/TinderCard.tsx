import React, { createRef, useEffect, useState } from 'react';
import './TinderCard.css';

import { Gesture, GestureConfig, createGesture, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

interface TinderCardState {
  id: number;
  status: string;
}

interface TinderCardProps {
  cardState: TinderCardState;
  onSwipeLeft: (state: TinderCardState) => void;
  onSwipeRight: (state: TinderCardState) => void;
}

const TinderCard: React.FC<TinderCardProps> = ({cardState, onSwipeLeft, onSwipeRight}) => {

  const elementRef = createRef<HTMLIonCardElement>();
  const windowWidth = window.innerWidth;

  const [swipeGesture, setSwipeGesture] = useState<Gesture|null>(null);
  const [transitionStyle, setTransitionStyle] = useState('');
  const [transformStyle, setTransformStyle] = useState('');

  useEffect(() => {
    if (elementRef.current !== null && swipeGesture === null) {
      const options: GestureConfig = {
        el: elementRef.current,
        gestureName: 'swipe',
        disableScroll: true,
        threshold: 5,
        onStart: () => {
          setTransitionStyle('none');
        },
        onMove: (ev) => {
          setTransformStyle(`translateX(${ev.deltaX}px) rotate(${ev.deltaX/20}deg)`);
        },
        onEnd: (ev) => {
          setTransitionStyle('0.3s ease-out');

          if (ev.deltaX > windowWidth/2){
            onSwipeRight(cardState);
            // setTransformStyle(`translateX(${windowWidth * 1.5}px) rotate(-20deg)`);
          } else if (ev.deltaX < -windowWidth/2){
            onSwipeLeft(cardState);
            // setTransformStyle(`translateX(-${windowWidth * 1.5}px) rotate(20deg));
          } else {
            setTransformStyle('');
          }
        }
      };
      
      const newGesture = createGesture(options);
      setSwipeGesture(newGesture);
      newGesture.enable();
    }
  }, [elementRef, swipeGesture, windowWidth, cardState, onSwipeRight, onSwipeLeft]);

  useEffect(() => {
    if (cardState.status === 'like' && elementRef.current !== null) {
      // elementRef.current.style.transition = '0.3s ease-out';
      // elementRef.current.style.transform = `translateX(-${windowWidth * 1.5}px) rotate(-20deg)`;
      setTransitionStyle('0.3s ease-out');
      setTransformStyle(`translateX(-${windowWidth * 1.5}px) rotate(-20deg)`);
    }
    if (cardState.status === 'hate' && elementRef.current !== null) {
      // elementRef.current.style.transition = '0.3s ease-out';
      // elementRef.current.style.transform = `translateX(${windowWidth * 1.5}px) rotate(20deg)`;
      setTransitionStyle('0.3s ease-out');
      setTransformStyle(`translateX(${windowWidth * 1.5}px) rotate(20deg)`);
    }
  }, [cardState.status, elementRef, windowWidth]);

  return (
    <IonCard ref={elementRef} style={{transition: transitionStyle, transform: transformStyle}} className="tinder-card" onTouchStart={() => console.log('down')} onTouchEnd={() => console.log('up')}>
      <img className="tinder-card-image" src="assets/img/rote-bohnen-suppe-mit-sauerrahm-0-47-20.jpg" alt=""/>
      <IonCardHeader>
        <IonCardTitle>Rote-Bohnen-Suppe mit Sauerrahm</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        Schmeckt fein und gibt Kraft: Rote-Bohnen-Suppe aus Kidneybohnen mit Knoblauch, Tomatenpüree und Sauerrahm, abgeschmeckt mit Zitronensaft und Kümmel.
      </IonCardContent>
    </IonCard>
  );
};

export default TinderCard;
