{
    init: function(elevators, floors) {

      
        var upPressed = [];
        var downPressed = [];
        var internallyPressed = [];

        elevators.forEach(function(elevator){
            elevator.on("floor_button_pressed", function(floorNum) {
              if(!internallyPressed.contains(floorNum)){
                  internallyPressed.push(floorNum);
                  internallyPressed.sort();
              }
            });
        });
        
        floors.forEach(function(floor){ 
            floor.on("up_button_pressed", function(floorNum) {
              if(!upPressed.contains(floorNum)){
                upPressed.push(floorNum);
                upPressed.sort();
              }
            });
            floor.on("down_button_pressed", function(floorNum) {
                if(!downPressed.contains(floorNum)){
                  downPressed.push(floorNum);
                  downPressed.sort();
                }
            });
        });
      

        
        
        var elevator = elevators[0];
        
        //elevator.on("floor_button_pressed", function(floorNum) {
        //	elevator.goToFloor(floorNum);
        //});
         
        elevator.on("floor_button_pressed", function(floorNum) {
            elevator.on("idle", function(){
                elevator.goToFloor(floorNum);
            });
        });           
        
        elevator.on("idle", function(){
            elevator.goToFloor(0);
        });       
        
        floors.forEach(function(floor){ // why is it function?
            if(elevator.goingUpIndicator() && floor.floorNum() > elevator.currentFloor()){
                floor.on("up_button_pressed", function() {
                    elevator.goToFloor(floor.floorNum());
                });
            }
            if(elevator.goingDownIndicator() && floor.floorNum() < elevator.currentFloor()){
                floor.on("down_button_pressed", function() {
                    elevator.goToFloor(floor.floorNum());
                });
            }
        });


    },
        update: function(dt, elevators, floors) {

        }
    
    
}
