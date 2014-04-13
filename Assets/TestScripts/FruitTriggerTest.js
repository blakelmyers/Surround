#pragma strict


function Start () {

}

function Update () {

}

function OnTriggerEnter(other:Collider){
    if(other.tag == "Yellow"){
        Destroy(this.gameObject);
    }
    if(other.tag == "Blue"){
        Destroy(this.gameObject);
    }
}