import React, { createRef, useEffect, useState } from 'react';
import './TinderCard.css';

import { Gesture, GestureConfig, createGesture, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

const TinderCard: React.FC = () => {

  const elementRef = createRef<HTMLIonCardElement>();

  const [swipeGesture, setSwipeGesture] = useState<Gesture|null>(null);
  const [transitionStyle, setTransitionStyle] = useState('');
  const [transformStyle, setTransformStyle] = useState('');

  useEffect(() => {
    if (elementRef.current !== null && swipeGesture === null) {
      const windowWidth = window.innerWidth;

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
            setTransformStyle(`translateX(${windowWidth * 1.5}px)`);
          } else if (ev.deltaX < -windowWidth/2){
            setTransformStyle(`translateX(-${windowWidth * 1.5}px)`);
          } else {
            setTransformStyle('');
          }
        }
      };
      
      const newGesture = createGesture(options);
      setSwipeGesture(newGesture);
      newGesture.enable();
    }
  }, [elementRef, swipeGesture]);

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
