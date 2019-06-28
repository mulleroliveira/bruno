import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContatoModalPage } from '../contato-modal/contato-modal.page';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  contatos;

  constructor(public modalController: ModalController, private storage: Storage, private http: HttpClient, public loadingController: LoadingController, public service:ServiceService) {
    this.loadingController.create({
      message: "Carregando"
    }).then((loader) => {
      loader.present()
      this.service.list().subscribe(
        (data) => {
          this.contatos = data
          loader.dismiss()
        }
      )
    })
  }

  add(contato) {
    this.loadingController.create({
      message:"Carregando"
    }).then((loader) => {
      loader.present()
      this.service.post(contato).subscribe(
        (data) => {
          this.contatos.push(data)
          this.storage.set('contato', this.contatos)
          loader.dismiss()
        }
      )
    })
  }

  remove(contato) {
    this.loadingController.create({
      message:"Carregando"
    }).then((loader) => {
      loader.present()
      this.service.delete(contato.id).subscribe(
        (data) => {
          var i = this.contatos.indexOf(contato);
          this.contatos.splice(i, 1);
          this.storage.set('contato', this.contatos)
          loader.dismiss()
        }
      )
    })
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



}
