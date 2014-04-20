#pragma strict

public class PoopTrigger extends Photon.MonoBehaviour{

var poopStartTimer: float;
var poopLife: float = 7;

function Start () {
	poopStartTimer = Time.time + poopLife;
}

function Update () {
	if(Time.time > poopStartTimer){
		PhotonNetwork.Destroy(this.gameObject);
	}
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