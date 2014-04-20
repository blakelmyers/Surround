#pragma strict

public class PoopTrigger extends Photon.MonoBehaviour{

var poopStart: float;
var poopTime: float = 7;

function Start () {
	poopStart = Time.time+poopTime;
}

function Update () {
	if(Time.time > poopStart){
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