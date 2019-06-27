import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'; // Passo 3 - Câmera


@Component({
  selector: 'app-contato-modal',
  templateUrl: './contato-modal.page.html',
  styleUrls: ['./contato-modal.page.scss'],
})
export class ContatoModalPage implements OnInit {

  constructor(public modalController: ModalController, private camera: Camera) { } // Passo 4, definição do camera - Câmera

  ngOnInit() {
  }

  novo_contato = {
    "nome": "",
    "avatar": "",
    "idade": "",
    "like": 0,
    "id":""
  }

  add() {
    this.modalController.dismiss(this.novo_contato)
  }

  take_picture() { // Passo 4 | Conjunto de opções...
    const options: CameraOptions = {
      quality: 100, // Qualidade da Foto. 0..100
      destinationType: this.camera.DestinationType.DATA_URL, // Qual é o tipo de destino, referencia local
      encodingType: this.camera.EncodingType.JPEG, // O tipo da extenção da imagem
      mediaType: this.camera.MediaType.PICTURE, // Qual é o tipo de aquivo.. Foto, vídeo..
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.novo_contato.avatar = 'data:image/jpeg;base64,' + imageData; // Definição do local de salvamento da imagem
    }, (err) => {
      alert(err)
    });
  }

}
