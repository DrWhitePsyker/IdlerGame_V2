//Global vars
var canvas = document.getElementById('stage');
var context = canvas.getContext('2d');
context.font = "15px Arial";
context.textBaseline = "top"; 
ResShift = 0;
Mode = 0
Xx = 20;
document.addEventListener("mouseup", SelectCheck);
var income = []
var outflow = []
tick = 0;

//Global Vars (Exploration specific)
MidW = canvas.width/2
MidH = canvas.height/2
expbuttoncount = 0;
flavourText=false;
ExpBoxes = [] 
BoxWidth = Xx+640;
BoxHeight = 130;
Sep = 60
BoxJump = BoxHeight+Sep;
BoxX = MidW - (BoxWidth/2);
Tag = 0;
outcome = false;
Maxstate = 0;

var config = {
	type: Phaser.AUTO,
	width: 720,
	height: 1280,
	backgroundColor: '#000000',
	parent: 'stage',
	scene: {
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);

function create(){

}

function update(time, delta) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	ResShift = 0;
	DrawModeButton();
	context.strokeRect(0,0,720,1280);
	if(Mode == 0){
	ResourceManager();
	}
	if(Mode == 1){
	ResearchManager();
	}
	if(Mode == 2){
	ExplorationManager();
	}
}

//PRIMARY CLICK LOGIC SECTION

function SelectCheck(event){ 
	var rect = canvas.getBoundingClientRect();
	var cX = event.clientX - rect.left;
	var cY = event.clientY - rect.top;
	Yy = 0;
	
	if(Within(cY,1180,1180+80) && Explorationmode == 0){ //mode switch buttons
		console.log("buttons");
		if(Within(cX,180,180+80)){
			console.log("switching to resources mode")
			Mode = 0;
		}
		
		if(Within(cX,360,360+80)){
			console.log("switching to reserach mode")
			Mode = 1;
		}
		
		if(Within(cX,540,540+80)){
			console.log("switching to exploration mode")
			Mode = 2;
		}
	}

	if(Mode == 0){ //Resource mode buttons  check	
		for(var i = 0; i < Resources.length; i++){
			if(Resources[i].Res_Discovered == true){
				Yy = Resources[i].Res_BarHeight;
				if(Within(cY,Yy,Yy+80)){
					console.log("region detected: " + Resources[i].Res_Name);
					
					if(Within(cX,420,500)){
						console.log("New auto pressed")
						Construct_Auto(i);
					}
					
					if(Within(cX,520,600)){
						console.log("Dismantle auto pressed")
						Dismantle_Auto(i);
					}
					
					if(Within(cX,620,700)){
						console.log("Manual task pressed")
						Perform_Task(i);
					}
				}
			}
		}
	}
	
	if(Mode == 1){ //Research mode buttons  check	
		for(var i = 0; i < Research.length; i++){

			if(Research[i].Research_Status == 1){
				Yy = Research[i].Res_BarHeight;
				if(Within(cY,Yy,Yy+80)){
					console.log("region detected: " + Research[i].Research_Name);
					
					if(Within(cX,620,700)){
						console.log("Research pressed")
						Buy_Research(i);
					}
				}
			}
		}
	}
		
	if(Mode == 2){ //exploration mode buttons check
		if (Explorationmode == 0){ //List mode
			for(var i = 0; i < Exp.length; i++){
				Yy = Exp[i].BarHeight;
				if(Exp[i].Discovered == 1){
					if(Within(cY,Yy+20,Yy+80)){
						console.log("region detected: " + Exp.Exp_Name);
						if(Within(cX,620,700)){
							console.log("Explore pressed")
							storyactive = i;
							ExplorationDrawer_list_button(storyactive);
							
						}
					}
				}
			}	
		}
		else{ //story mode
			if(expbuttoncount != 0){
				for(var i = 0; i < expbuttoncount; i++){
					Yy = ExpBoxes[i];
					if(Within(cY,Yy,Yy+BoxHeight)){
						if(Within(cX,BoxX,BoxX+BoxWidth)){
							console.log("Explore deeper pressed")
							Tag = i;
							Exploration_story_button(storyactive);
						}
					}
				}
			}
		}
	}
}

function DrawModeButton(){
	if(Explorationmode == 0){ //removes buttons if a story is going on
		
	context.save();
	context.textAlign = "center";
	context.font = "15px Arial";
	
		if(Mode == 0){
				context.fillStyle="#ADFF2F";
				}else{
				context.fillStyle="#D3D3D3";
				}
		context.fillRect(180,1180,80,80);
		context.fillStyle="#808080";
		context.strokeRect(180,1180,80,80);
		Draw_TextWithShadow(220,1210,"Resources","#000000","#FFFFFF",1)

		if(Mode == 1){
				context.fillStyle="#ADFF2F";
				}else{
				context.fillStyle="#D3D3D3";
				}
		context.fillRect(360,1180,80,80);
		context.fillStyle="#808080";
		context.strokeRect(360,1180,80,80);
		Draw_TextWithShadow(400,1210,"Research","#000000","#FFFFFF",1)

		if(Mode == 2){
				context.fillStyle="#ADFF2F";
				}else{
				context.fillStyle="#D3D3D3";
				}
				
		context.fillRect(540,1180,80,80);
		context.fillStyle="#808080";
		context.strokeRect(540,1180,80,80);
		Draw_TextWithShadow(580,1210,"Exploration","#000000","#FFFFFF",1)
		
		context.restore();
	}
}

//RESOURCE MANAGER SECTION

function ResourceManager(){ //oversees the resources scene, as well as tracking the game clock for income calculations.  
	//DRAWING RESOURCES
	IncomeCalc();
	ResourceDrawer();
}

function IncomeCalc(){
	tick++;
	//CALCING OUTPUT BASED ON MODIFIERS. 
	for(var i = 0; i < Resources.length; i++){//inital wipe of outcome
		Resources[i].Outcome = 0;
	}
	
	for(var i = 0; i < Resources.length; i++){
		if(Resources[i].Res_Discovered == true){
			Flow = Autos[i].Auto_Count * ((1 + Tasks[i].Tas_Modi) * Autos[i].Auto_BaseEff)
			Resources[i].Income = Flow
			TaskcostType = Tasks[i].Tas_Cost_Resource
			Taskcost = Tasks[i].Tas_Cost_Amount
			if(TaskcostType != -1){
				Resources[TaskcostType].Outcome += (Flow * Taskcost)
			}				

			if (tick == 10){
				Resources[i].LastTickAmount = Resources[i].Res_Amount;
				if(TaskcostType != -1){
					Resources[i].CanAfford = false
					if (Resources[TaskcostType].Res_Amount >= (Taskcost * Autos[i].Auto_Count)){ //Task has a cost. Make sure we can afford it this pass before giving it to the player.
						Resources[TaskcostType].Res_Amount -= Resources[TaskcostType].Outcome;
						Resources[i].Res_Amount += Resources[i].Income;
						Resources[i].CanAfford = true;
					}
				}
				else{
					Resources[i].Res_Amount += Resources[i].Income;//resource is free, give it to the player without checks
				} 
			} 
			if (Resources[i].Res_Amount <= 0){Resources[i].Res_Amount = 0} //clamping for safety. Nothing should ever go under zero but I dont want to risk it.			
		}
	}
	if(tick == 10){
		tick = 0;
	} //resetting tick}
}

function ResourceDrawer(){
for(var i = 0; i < Resources.length; i++){
		if(Resources[i].Res_Discovered == true){
			Yy = 20+ResShift;
			Resources[i].Res_BarHeight = Yy; //Storing bar height for button management. 
			context.fillStyle="#D3D3D3";
			context.fillRect(Xx-5,Yy,685,80);
			context.fillStyle="#808080";
			context.strokeRect(Xx-5,Yy,685,80);
			Draw_TextWithShadow(Xx,Yy,Resources[i].Res_Name,"#000000","#FFFFFF",1)
			Draw_TextWithShadow(Xx,Yy+20,String(Math.floor(Resources[i].Res_Amount) + " in stockpile"),"#000000","#FFFFFF",1)
			Draw_TextWithShadow(Xx,Yy+40,String(Autos[i].Auto_Count + " " + Autos[i].Auto_Name + "s owned"),"#000000","#FFFFFF",1)
			if (Tasks[i].Tas_Cost_Resource == -1){
				Draw_TextWithShadow(Xx,Yy+60,"Producing " + String(Resources[i].Income - Resources[i].Outcome) + " per tick","#000000","#FFFFFF",1)
			}
			else{
				if (Resources[i].CanAfford == true){
					Draw_TextWithShadow(Xx,Yy+60,"Producing " + String(Resources[i].Res_Amount - Resources[i].LastTickAmount) + " per tick","#000000","#FFFFFF",1)
				}
				else
				{
					Draw_TextWithShadow(Xx,Yy+60,"Unable to produce - insufficent prerequisites!","#ff0000","#FFFFFF",1)
				}
			}
			//DRAWING AND HANDLING BUTTON
			context.save();
			context.textAlign = "center";
			context.font = "10px Arial";
			
			//Build Automation
			context.fillStyle="#800000";
			context.fillRect(Xx+400,Yy,80,80);
			context.fillStyle="#808080";
			context.strokeRect(Xx+400,Yy,80,80);
			Draw_TextWithShadow(Xx+440,Yy+2,"Build new","#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+440,Yy+12,String(Autos[i].Auto_Name),"#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+440,Yy+25,"Costs:","#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+440,Yy+35,String(Autos[i].Auto_BaseCost+(Autos[i].Auto_BaseCost*Autos[i].Auto_Count)),"#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+440,Yy+45,"Scrap","#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+440,Yy+58,"Produces: ","#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+440,Yy+68,String((1 + (1 * Tasks[i].Tas_Modi))*Autos[i].Auto_BaseEff) +"/tick","#000000","#FFFFFF",1);
			
			//Remove automation
			context.fillStyle="#800000";
			context.fillRect(Xx+500,Yy,80,80);
			context.fillStyle="#808080";
			context.strokeRect(Xx+500,Yy,80,80);
			Draw_TextWithShadow(Xx+540,Yy+2,"Deconstruct","#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+540,Yy+12,String(Autos[i].Auto_Name),"#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+540,Yy+30,"Refunds:","#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+540,Yy+40,String((Autos[i].Auto_BaseCost*Autos[i].Auto_Count)/2),"#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+540,Yy+50,"Scrap","#000000","#FFFFFF",1);
			
			//Perform Task (placed so its easiest to reach on phone screen)
			context.fillStyle="#800000";
			context.fillRect(Xx+600,Yy,80,80);
			context.fillStyle="#808080";
			context.strokeRect(Xx+600,Yy,80,80);
			Draw_TextWithShadow(Xx+640,Yy+2,"Manually","#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+640,Yy+10,Tasks[i].Tas_Name,"#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+640,Yy+22,"Produces:","#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+640,Yy+30,String(1 + (1 * Tasks[i].Tas_Modi)),"#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+640,Yy+38,Resources[i].Res_Name,"#000000","#FFFFFF",1);
			Taskcost = 0;
			Taskcost = Tasks[i].Tas_Cost_Resource;
			if (Taskcost != -1){
				Draw_TextWithShadow(Xx+640,Yy+52,"Costs:","#000000","#FFFFFF",1);
				Draw_TextWithShadow(Xx+640,Yy+60,String(Tasks[i].Tas_Cost_Amount), "#000000","#FFFFFF",1);
				Draw_TextWithShadow(Xx+640,Yy+68,Resources[Taskcost].Res_Name,"#000000","#FFFFFF",1);	
			}
			
			context.restore();
			//RES SHIFT
			ResShift+=100;
		}
	}
}

function Construct_Auto(i){
	AutoCost = Autos[i].Auto_BaseCost+(Autos[i].Auto_BaseCost*Autos[i].Auto_Count)
	if(Resources[0].Res_Amount >= AutoCost) //TODO - PASS IN RESOURCE COST TYPE HERE TOO INSTEAD OF DEFAULTING TO SCRAP. 
	{
		console.log("Afforded new auto for " + AutoCost)
		Resources[0].Res_Amount -= AutoCost;
		Autos[i].Auto_Count++;
		
	}
}

function Dismantle_Auto(i){
	if(Autos[i].Auto_Count > 0) //TODO - PASS IN RESOURCE COST TYPE HERE TOO INSTEAD OF DEFAULTING TO SCRAP. 
	{
		console.log("Sold Auto for " + (Autos[i].Auto_BaseCost*Autos[i].Auto_Count) /2)
		Resources[0].Res_Amount += (Autos[i].Auto_BaseCost*Autos[i].Auto_Count) /2;
		Autos[i].Auto_Count--;
	}
}

function Perform_Task(i){
	Taskcost = 0;
	Taskcost = Tasks[i].Tas_Cost_Resource;
	if (Taskcost != -1){
		console.log("RESOURCE HAS COST - CHECK AND DEDUCT")
		console.log(Taskcost)
		if(Resources[Taskcost].Res_Amount >= Tasks[i].Tas_Cost_Amount){ 
			Resources[Taskcost].Res_Amount -= Tasks[i].Tas_Cost_Amount;
			Resources[i].Res_Amount += 1 + (1*Tasks[i].Tas_Modi);
		}
	}
	else
	{
		console.log("RESOURCE HAS NO COST, SIMPLY PRODUCE")
		Resources[i].Res_Amount += 1 + (1*Tasks[i].Tas_Modi);
	}
}

function Draw_Diary(){

}

//RESEARCH MANAGER SECTION

function ResearchManager(){
IncomeCalc();
ResearchDrawer()
}

function ResearchDrawer(){
	for(var i = 0; i < Research.length; i++){
		if(Research[i].Research_Status == 1){
			Yy = 20+ResShift;
			Research[i].Res_BarHeight = Yy;
			context.fillStyle="#D3D3D3";
			context.fillRect(Xx-5,Yy,685,80);
			context.fillStyle="#808080";
			context.strokeRect(Xx-5,Yy,685,80);
			Draw_TextWithShadow(Xx,Yy,Research[i].Research_Name,"#000000","#FFFFFF",1)
			Draw_TextWithShadow(Xx,Yy+20,Research[i].Research_Discovery,"#000000","#FFFFFF",1)
			if(Research[i].Research_Modifer != null)
			{
			Draw_TextWithShadow(Xx,Yy+40,"Boosts " + eval(Research[i].Research_Influences).Res_Name + " output by " + Research[i].Research_Modifer + "%","#000000","#FFFFFF",1)
			}
			else{
			Draw_TextWithShadow(Xx,Yy+40,"Unlocks: " + eval(Research[i].Research_Influences).Res_Name,"#000000","#FFFFFF",1)
			}
			
			//DRAWING AND HANDLING BUTTON
			context.save();
			context.textAlign = "center";
			context.font = "10px Arial";
			
			//Buy research
			context.fillStyle="#800000";
			context.fillRect(Xx+600,Yy,80,80);
			context.fillStyle="#808080";
			context.strokeRect(Xx+600,Yy,80,80);
			Draw_TextWithShadow(Xx+640,Yy+2,"Research","#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+640,Yy+25,"Costs:","#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+640,Yy+35,Research[i].Research_Cost_Amount,"#000000","#FFFFFF",1);
			Draw_TextWithShadow(Xx+640,Yy+45,eval(Research[i].Research_Cost_Type).Res_Name,"#000000","#FFFFFF",1);
			
			context.restore();
			
			//RES SHIFT
			ResShift+=100;
		}
	}
}

function Buy_Research(i){
	Cost = 0;
	Cost = Research[i].Research_Cost_Amount;
	CostType = Research[i].Research_Cost_Type;
	if(eval(CostType).Res_Amount >= Research[i].Research_Cost_Amount){ 
		eval(CostType).Res_Amount -= Research[i].Research_Cost_Amount;
		Research[i].Research_Status = 2;
		if(Research[i].Research_Modifer != null) // applying modifiers
		{
			console.log("Research has modifier value. Starting scan");
			for(var j = 0; j < Resources.length; j++){ 
				if(eval(Research[i].Research_Influences) == Resources[j]){
					console.log("matching ID found - starting task value: " + Tasks[j].Tas_Modi);
					console.log("applying modifier value relating task value: " + Research[i].Research_Modifer/100);
					Tasks[j].Tas_Modi += Research[i].Research_Modifer/100;
					console.log("resulting task value: " + Tasks[j].Tas_Modi);
				}
			}
		}
		else
		{
		eval(Research[i].Research_Influences).Res_Discovered = true;
		}
		
		
		if (Research[i].Research_Unlocks_Research != null){ //performing scan for activated research. 
			eval(Research[i].Research_Unlocks_Research).Research_Status = 1;
		}
	}
}

//EXPLORATION MANAGER SECTION

function ExplorationManager(){
	IncomeCalc();
	if (Explorationmode == 0){
		ExplorationDrawer_list();
	}
	else{
		ExplorationDrawer_story(storyactive);
	}
}

function ExplorationDrawer_list(){
	for(var i = 0; i < Exp.length; i++){
			if(Exp[i].Discovered != 0){
				Xx = 20;
				Yy = 20+ResShift;
				Exp[i].BarHeight = Yy;
				context.fillStyle="#D3D3D3";
				context.fillRect(Xx-5,Yy,685,80);
				context.fillStyle="#808080";
				context.strokeRect(Xx-5,Yy,685,80);
				context.save();
				if(Exp[i].Discovered == 1){
					context.textAlign = "left";
					context.textBaseline = "middle";
					context.font = "30px Arial";
					Draw_TextWithShadow(Xx,Yy+40,Exp[i].Exp_Name,"#000000","#FFFFFF",1)
					context.textAlign = "center";
					context.textBaseline = "top";
					context.font = "13px Arial";
					//DRAWING AND HANDLING BUTTON
					context.fillStyle="#800000";
					context.fillRect(Xx+600,Yy,80,80);
					context.fillStyle="#808080";
					context.strokeRect(Xx+600,Yy,80,80);
					Draw_TextWithShadow(Xx+640,Yy+2,"Explore","#000000","#FFFFFF",1);
					Draw_TextWithShadow(Xx+640,Yy+25,"Costs:","#000000","#FFFFFF",1);
					Draw_TextWithShadow(Xx+640,Yy+40,Exp[i].Fuel_Cost,"#000000","#FFFFFF",1);
					Draw_TextWithShadow(Xx+640,Yy+55,"Fuel","#000000","#FFFFFF",1);
					context.restore();
				}
				else{
					context.globalAlpha = 0.8
					context.fillRect(Xx-5,Yy,685,80);
					context.globalAlpha = 1
					context.font = "30px Arial";
					Draw_TextWithShadow(Xx,Yy+35,Exp[i].Exp_Name,"#000000","#000000",1)
					context.font = "25px Arial";
					Draw_TextWithShadow(Xx+342,Yy+30,'[COMPLETED!]',"#FFA07A","#FF0000",1)
					
				}
				context.restore();
				//RES SHIFT
				ResShift+=100;
			}
		}
}

function ExplorationDrawer_list_button(i){
	if(Resource_Fuel.Res_Amount >= Exp[i].Fuel_Cost){
		console.log("Firing story mode")
		Resource_Fuel.Res_Amount -= Exp[i].Fuel_Cost;
		currentstate = 1;
		Explorationmode = 1; //triggering story mode
	}
}

function ExplorationDrawer_story(k){
	Yy = 0;
	Maxstate = Exp[k].States + 1
	target = "Exp[k].Sta_" + String(currentstate)
	StoryState = eval(target)
	if (currentstate < Maxstate){ //to stop a crash when it tries to read a nonexistant state
		context.save();
		context.textAlign = "center";
		context.font = "24px Arial";
		context.fillStyle="#D3D3D3";
		context.fillRect(Xx,Yy+160,(MidW-Xx)*2,960);
		context.fillStyle="#808080";
		context.strokeRect(Xx,Yy+160,(MidW-Xx)*2,960);
		Draw_TextWithShadow(Xx+340,Yy+180,StoryState.Text,"#000000","#FFFFFF",1);
		context.restore();
		
		//DRAWING AND HANDLING BUTTON

		context.save();
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.font = "20px Arial";
		BoxOffset = (BoxHeight*StoryState.Opts)+(Sep*(StoryState.Opts-1))/2
		ExpBoxes = []; 
		expbuttoncount = StoryState.Opts;
		for (var h = 0; h<StoryState.Opts; h++){
			BoxY = MidH + 400 - BoxOffset + (BoxJump*h)
			ExpBoxes[h] = BoxY;
			context.fillStyle="#800000";
			context.fillRect(BoxX,BoxY,BoxWidth,BoxHeight);
			context.fillStyle="#808080";
			context.strokeRect(BoxX,BoxY,BoxWidth,BoxHeight);
			target = "StoryState.Opt_" + String(h+1);
			Option = eval(target)
			Draw_TextWithShadow(MidW,BoxY+(BoxHeight/2),Option.Button_Text,"#000000","#FFFFFF",1);
		}
		context.restore();
	}
	
	
	if(flavourText == true){
		context.save();
		context.textAlign = "center";
		context.font = "24px Arial";
		context.fillStyle="#D3D3D3";
		context.fillRect(Xx,Yy+160,(MidW-Xx)*2,960);
		context.fillStyle="#808080";
		context.strokeRect(Xx,Yy+160,(MidW-Xx)*2,960);
		target = "StoryState.Opt_" + String(Tag+1);
		Option = eval(target)
		Draw_TextWithShadow(Xx+340,Yy+180,Option.Story_Text,"#000000","#FFFFFF",1);
		ExpBoxes = []; 
		BoxY = 910;
		context.textBaseline = "middle";
		context.font = "20px Arial";
		context.fillStyle="#800000";
		context.fillRect(BoxX,BoxY,BoxWidth,BoxHeight);
		context.fillStyle="#808080";
		context.strokeRect(BoxX,BoxY,BoxWidth,BoxHeight);
		ExpBoxes[0] = BoxY;
		if(Option.Outcome == 'Progress'){ 
			Draw_TextWithShadow(MidW,BoxY+(BoxHeight/2),"Success! Continue Onwards!","#000000","#FFFFFF",1);
			outcome = true;
		}
		else{
			Draw_TextWithShadow(MidW,BoxY+(BoxHeight/2),"Failure! Retreat to the safehouse!","#000000","#FFFFFF",1);
			outcome = false;
		}
		context.restore();
	}
}

function Exploration_story_button(i){
	if (flavourText == false){
		flavourText=true;
	}
	else{
		currentstate++;
		flavourText=false;
		if(outcome == false){ //we lost, lets leave
		currentstate = 1;
		Explorationmode = 0;
		}
		else{ //We won, but did we finish it?
			if(currentstate == Maxstate){
				currentstate = 1;
				Explorationmode = 0;
				for (var h = 0; h<Exp[i].Rewards_Research.length; h++){ //stepping through the rewards
					target = Exp[i].Rewards_Research[h]
					rech = -1;
					for (var j = 0; j<Research.length; j++){ //restepping through the researches looking for matches
						if (Research[j].LID == target){rech = j}
					}
					if (rech == -1){console.log('WARNING. REWARD RESEARCH NOT FOUND!: ' + target)}
					else{
						console.log('Rewarding player with: ' + target);
						Research[rech].Research_Status = 1;
						console.log(i);
						Exp[i].Discovered = 2;
						Exp[i+1].Discovered = 1;
					}
					
					
				}
			}
		}
	}
}





//USEFUL FUNCTIONS
function FindMatch(Input,Target) {
  return Input == target;
}

function Draw_TextWithShadow(tX, tY, inputtext,shadowcolour,colour,shadowsize,sepheight){
		if(typeof sepheight == 'undefined'){ //backloging for outdated versions
			var fonttype = context.font
			var lines = fonttype.split('/n ')
			for (var i = 0; i<lines.length; i++){
				if(lines[i].indexOf('px') != -1){
					fontsize = lines[i];
				}
			}
			fontsize = fontsize.replace('px','');
			sepheight = parseInt(fontsize,10)
		}
		
		if(typeof inputtext !== 'string'){ //forced stringifcation of inputtext
			inputtext = String(inputtext);
		}
		
		//Line spliter
		var lines = inputtext.split('/n ')
		
		//Line drawer
		for (var i = 0; i<lines.length; i++){
		context.fillStyle = shadowcolour;
		context.fillText(lines[i], tX-shadowsize, tY-shadowsize);
		context.fillText(lines[i], tX+shadowsize, tY-shadowsize);
		context.fillText(lines[i], tX-shadowsize, tY);		
		context.fillText(lines[i], tX-shadowsize, tY+shadowsize);
		context.fillText(lines[i], tX+shadowsize, tY+shadowsize);
		context.fillStyle = colour;
		context.fillText(lines[i], tX, tY);
		tY += sepheight
		}
}

function Within(Value, Bottom, Top){
	if(Value < Top && Value > Bottom)
	{return true}
	else
	{return false}
}

function Within_Range(Value, Range, Midpoint){
	if(Value < (Midpoint + Range) && Value > (Midpoint - Range))
	{return true}
	else
	{return false}
}

function LoopAround(Value, Top, Bottom){
	if(Value > Top){return Bottom}
	else{return Value}
	
}

/*

//LOG HOW THE EXPLORATION SYSTEM WORKS

*/
