#pragma strict

public class PoopTrigger extends Photon.MonoBehaviour{

function Start () {

}

function Update () {

}

function OnTriggerEnter(other:Collider){

    
    Debug.Log(other.tag + "Poop");
    if((other.tag != "Untagged"))
    {
        if(other.tag != this.tag)
        {
            if((other.tag + "Poop") != this.tag){
               Debug.Log("Destroy");
               if(photonView.isMine)
                {
                    PhotonNetwork.Destroy(this.gameObject);
                }
            }
        }
    }
}

}