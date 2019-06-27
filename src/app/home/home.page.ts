import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContatoModalPage } from '../contato-modal/contato-modal.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalController: ModalController, private storage: Storage) {
    this.storage.clear()
  }

  add(contato) {
    this.contatos.push(contato)
    this.storage.set('contato', this.contatos)
  }

  remove(contato) {
    var i = this.contatos.indexOf(contato);
    this.contatos.splice(i, 1);
    this.storage.set('contato', this.contatos)
  }

  async modal() {
    const modal = await this.modalController.create({
      component: ContatoModalPage
    });
    await modal.present();

    modal.onDidDismiss().then((contato) => {
      this.add(contato.data)
    })
  }

  like(contato) {
    contato.like = contato.like + 1
  }

  contatos = []

}
