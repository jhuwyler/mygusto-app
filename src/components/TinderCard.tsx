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
  }, [elementRef, swipeGesture, windowWidth, cardState, onSwipeRight, onSwipeLeft]);

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
    <IonCard className="tinder-card" ref={elementRef} style={{transition: transitionStyle, transform: transformStyle}} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <img className="tinder-card-image" src="assets/img/rote-bohnen-suppe-mit-sauerrahm-0-47-20.jpg" alt=""/>
      <div style={{maxHeight: 325, overflow: 'scroll'}}>
        <IonCardHeader>
          <IonCardTitle>Rote-Bohnen-Suppe mit Sauerrahm</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Schmeckt fein und gibt Kraft: Rote-Bohnen-Suppe aus Kidneybohnen mit Knoblauch, Tomatenpüree und Sauerrahm, abgeschmeckt mit Zitronensaft und Kümmel.
          {showDetails && (
            <div>
              <hr/>
              <h1>Zutaten</h1>
              <ul>
                <li>Kidney-Bohnen aus der Dose</li>
                <li>Knoblauchzehen</li>
                <li>Olivenöl</li>
                <li>Gemüsebouillon</li>
                <li>Saurer Halbrahm</li>
                <li>Salz</li>
                <li>Cayennepfeffer</li>
                <li>Zitronensaft</li>
                <li>Kümmel, nach Belieben</li>
                <li>Basilikum</li>
              </ul>
            </div>
          )}
        </IonCardContent>
      </div>
    </IonCard>
  );
};

export default TinderCard;
