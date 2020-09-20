import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonToast,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonList,
    IonCheckbox, IonLabel, IonItem, IonIcon, IonBadge
} from '@ionic/react';
import React, {  useEffect, useState } from 'react';
import './GroceryList.css';
import axios from 'axios';
import { baseURL } from '../config';
import { trash } from 'ionicons/icons';

type Item = {
  id: number;
  name: string;
  discount: string;
  cumulus: string;
  quantity: string;
};

const GroceryList: React.FC = () => {
  const [list, setList] = React.useState<Item[]>([]);
  const [showToastRemoved, setShowToastRemoved] = useState(false);

async function flushList(){
    const newList : Item[]= [];
    setShowToastRemoved(true);
    setList(newList);
    await axios.delete(baseURL + '/recipe/shopping_list');
}
async function fetchList() {
    const result = await axios.get(baseURL + '/ingredient');
    setList(items => result.data.map((item:any, index:number) => ({
      id: index,
      name: item.name,
      discount: Math.random() <= 0.3 ? '20%' : '',
      cumulus: Math.random() <= 0.3 ? '10x' : '',
      quantity: item.quantity,
    })));
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle><span style={{color: 'darkorange', fontFamily: 'Arial'}}>M</span><span style={{color: 'black', fontFamily: 'Arial'}}>yShoppingList</span></IonTitle>
        </IonToolbar>

      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
          <IonTitle size="large"><span style={{color: 'darkorange', fontFamily: 'Arial'}}>M</span><span style={{color: 'black', fontFamily: 'Arial'}}>yShoppingList</span></IonTitle>
            <IonButtons slot="primary">
              <IonButton class='floatRight' color="danger" onClick={flushList}>
                <IonIcon slot="icon-only" icon={trash} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonCheckbox checked={true}/>
            <IonLabel>Aktionen anzeigen</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox checked={true}/>
            <IonLabel>Cumulus Angebote anzeigen</IonLabel>
          </IonItem>
        </IonList>
      {list.length > 0 &&
        <IonGrid>
            {list.map((item) => (
                <IonRow key={item.id} class="rowclass">
                  <IonCol size="8" className="ion-align-self-start">{item.name} {item.discount && <IonBadge className="discount-badge">{item.discount}</IonBadge>} {item.cumulus && <img className="cumulus-badge" src="assets/img/migros_cumulus_crop.png" alt=""/>}
                  </IonCol>
                  <IonCol className="ion-align-self-end" class='textRight'>{item.quantity !== '0' && item.quantity}</IonCol>
                </IonRow>
            ))}
         </IonGrid>}
      {list.length === 0 &&
        <IonCard>
          <IonCardContent>
                Nichts einzukaufen. Füge Rezepte zur Einkaufsliste hinzu!
          </IonCardContent>
        </IonCard>
      }
      <IonToast
        isOpen={showToastRemoved}
        onDidDismiss={() => setShowToastRemoved(false)}
        message="Einkaufsliste geleert"
        duration={400}
      />
      </IonContent>
    </IonPage>

  );
};

export default GroceryList;
