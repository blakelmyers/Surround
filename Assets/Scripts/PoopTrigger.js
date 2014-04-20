#pragma strict

public class PoopTrigger extends Photon.MonoBehaviour{

var poopTimer: float;
var poopLastTimer: float = 7;

function Start () {
	poopTimer = Time.time + poopLastTimer;
}

function Update () {
	if(Time.time > poopTimer){
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