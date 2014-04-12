#pragma strict

public class FruitTrigger extends Photon.MonoBehaviour{

function Start () {

}

function Update () {

}

function OnTriggerEnter(other:Collider){

        Destroy(this.gameObject);
}
}