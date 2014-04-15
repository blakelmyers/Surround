#pragma strict

public class FruitTrigger extends Photon.MonoBehaviour{

private var respawnTime : float = 15;  // 3 seconds

private var spawnTimer : float;

private var waitingToSpawn : boolean = false;

function Start () {

}

function Update () {

    if(waitingToSpawn)
    {
        // check timer
        if(Time.time >= spawnTimer) 
        {
            transform.renderer.enabled = true;
            transform.position.y = 3;
            waitingToSpawn = false;
        }
    }
}

function OnTriggerEnter(other:Collider){

      if(!waitingToSpawn)
      {
          Debug.Log("hit fruit");
          transform.renderer.enabled = false;
          transform.position.y = -200;
          
          waitingToSpawn = true;
          spawnTimer = Time.time + respawnTime;
      }
        //Destroy(this.gameObject);
}
}