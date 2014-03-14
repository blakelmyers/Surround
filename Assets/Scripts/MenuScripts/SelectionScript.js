enum DinosaurEnum {
    YellowTall = 0,
    RedTall = 1,
    PurpleFat = 2,
    BlueFat = 3, 
}

static var selectionChoice : DinosaurEnum;

function Start(){   
    selectionChoice = DinosaurEnum.YellowTall;
}