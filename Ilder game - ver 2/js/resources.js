//DATA BACKEND HYPER FILE//
//HOLY SHIT THIS PAGE IS AN EYE SORE

{//##RESOURCES##//
var Resources = []


var Resource_Scrap = { 
	Res_Name:'Scrap',
	Res_Amount : 0,
	CanAfford : true,
	Income: 0,
	Outcome: 0,
	LastTickAmount: 0,
	Res_Discovered : true,
	Res_Discovery_Text :'this should never be displayed',
	Res_BarHeight: 0
}
Resources.push(Resource_Scrap)


var Resource_Water = { 
	Res_Name :'Water',
	Res_Amount : 0,
	CanAfford : true,
	Income: 0,
	Outcome: 0,
	Res_Discovered : false,
	Res_Discovery_Text : "You've discovered some nonradioactive water! Aside from its industrial uses, it also tastes better!",
	Res_BarHeight: 0
}
Resources.push(Resource_Water)


var Resource_Fuel = { 
	Res_Name :'Hydrofuel',
	Res_Amount : 0,
	CanAfford : true,
	Income: 0,
	Outcome: 0,
	Res_Discovered : false,
	Res_Discovery_Text : "You've discovered some standard hydrofuel gel! Now if only you had a bike...",
	Res_BarHeight: 0
}
Resources.push(Resource_Fuel);


var Resource_Ingots = { 
	Res_Name :'Ingots',
	Res_Amount : 0,
	CanAfford : true,
	Income: 0,
	Outcome: 0,
	Res_Discovered : false,
	Res_Discovery_Text : "You've discovered some refined metal ingots! Way better than scrap!",
	Res_BarHeight: 0
}
Resources.push(Resource_Ingots);


var Resource_Components = { 
	Res_Name :'Components',
	Res_Amount : 0,
	CanAfford : true,
	Income: 0,
	Outcome: 0,
	Res_Discovered : false,
	Res_Discovery_Text : "You've recovered some usable mechnical components! Time for your own industrial revolution!",
	Res_BarHeight: 0
}
Resources.push(Resource_Components);


var Resource_Nuclear = { 
	Res_Name :'Tritium',
	Res_Amount : 0,
	CanAfford : true,
	Income: 0,
	Outcome: 0,
	Res_Discovered : false,
	Res_Discovery_Text : "You've recovered some usable Tritium! The power of yesterdays future!",
	Res_BarHeight: 0
}
Resources.push(Resource_Nuclear);

}

{//##TASKS##//
var Tasks = [];


var Task_Scrap = {  //ID 0
	Tas_Name :'Salvage Scrap', 
	Tas_Cost_Resource : -1, 
	Tas_Cost_Amount : 0,
	Tas_Modi : 0
}
Tasks.push(Task_Scrap);


var Task_Water = {  //ID 1
	Tas_Name :'Boil Water', 
	Tas_Cost_Resource : -1, 
	Tas_Cost_Amount : 0,
	Tas_Modi : 0
}
Tasks.push(Task_Water);


var Task_Fuel= {  //ID 2
	Tas_Name :'Refine Fuel', 
	Tas_Cost_Resource : 1, 
	Tas_Cost_Amount : 10,
	Tas_Modi : 0
}
Tasks.push(Task_Fuel);


var Task_Ingots= {  //ID 3
	Tas_Name :'Smelt Ingots', 
	Tas_Cost_Resource : 0, 
	Tas_Cost_Amount : 10,
	Tas_Modi : 0
}
Tasks.push(Task_Ingots);


var Task_Components= {  //ID 4
	Tas_Name :'Salvage Parts', 
	Tas_Cost_Resource : 0, 
	Tas_Cost_Amount : 10,
	Tas_Modi : 0
}
Tasks.push(Task_Components);


var Task_Nuclear= {  //ID 5
	Tas_Name :'Process Tritium', 
	Tas_Cost_Resource : 2, 
	Tas_Cost_Amount : 10,
	Tas_Modi : 0
}
Tasks.push(Task_Nuclear);

}

{//##AUTOMATIONS##//
var Autos=[]


var Auto_Scrap = { 
	Auto_Name: "AutoGrinder",
	Auto_BaseEff: 0.5,
	Auto_Count: 0,
	Auto_ResearchReq: "",
	Auto_Modifiers : ["Research_Grinder_1", "Research_Grinder_2", "Research_Grinder_3"],
	Auto_BaseCost: 25
	
}
Autos.push(Auto_Scrap)

	
var Auto_Water = { 
	Auto_Name : "Purifier",
	Auto_BaseEff : 0.5,
	Auto_Count: 0,
	Auto_ResearchReq : "Research_Water",
	Auto_Modifiers: ["Research_Water_1", "Research_Water_2","Research_Water_3"],
	Auto_BaseCost : 25
}
Autos.push(Auto_Water)

	
var Auto_Fuel= { 
	Auto_Name : "Hydrogel Refinery",
	Auto_BaseEff : 0.5,
	Auto_Count: 0,
	Auto_ResearchReq : "Research_FuelRefinery",
	Auto_Modifiers : ["Research_Fuel_1", "Research_Fuel_2", "Research_Fuel_3"],
	Auto_BaseCost : 25,
}
Autos.push(Auto_Fuel)

	
var Auto_Ingots= { 
	Auto_Name : "AutoSmelter",
	Auto_BaseEff : 0.5,
	Auto_Count: 0,
	Auto_ResearchReq : "Research_Smelter",
	Auto_Modifiers:["Research_Ingot_1", "Research_Ingot_2", "Research_Ingot_3"],
	Auto_BaseCost : 25
}
Autos.push(Auto_Ingots)

	
var Auto_Components= { 
	Auto_Name : "Industrial Disassembler",
	Auto_BaseEff : 0.5,
	Auto_Count: 0,
	Auto_ResearchReq : "Research_Disassembler",
	Auto_Modifiers:["Research_Components_1", "Research_Components_2", "Research_Components_3"],
	Auto_BaseCost : 25
}
Autos.push(Auto_Components)

	
var Auto_Nuclear= { 
	Auto_Name : "Tritium Centrifuge",
	Auto_BaseEff : 0.5,
	Auto_Count: 0,
	Auto_ResearchReq : "Research_IndustrialNuclear",
	Auto_Modifiers:["Research_Nuclear_1", "Research_Nuclear_2", "Research_Nuclear_3"],
	Auto_BaseCost : 25
}
Autos.push(Auto_Nuclear)

}

{//##RESEARCH##// 
var Research = [];

var Research_Grinder_1 = { 
	LID :'Research_Grinder_1',
	Research_Name:"Improvised grinder teeth",
	Research_Discovery: "You improve your grinders efficency with some sharp scrap metal teeth!", 
	Research_Influences :'Resource_Scrap',
	Research_Cost_Type :'Resource_Scrap',
	Research_Cost_Amount : 25,
	Research_Modifer : 25, //OPTIONAL - REMOVE IF RESEARCH JUST UNLOCKS A RESOURCE
	Res_BarHeight : 0,
	Research_Status : 1
}
Research.push(Research_Grinder_1)

var Research_Grinder_2 = { 
	LID :'Research_Grinder_2',
	Research_Name:"Industrial grinder teeth",
	Research_Discovery: "You further improve your grinders efficency with industrial-grade diamond teeth!",
	Research_Influences :'Resource_Scrap',
	Research_Cost_Type :'Resource_Components',
	Research_Cost_Amount : 50,
	Research_Modifer : 25,//OPTIONAL
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Grinder_2)


var Research_Grinder_3 = { 
	LID :'Research_Grinder_3',
	Research_Name:"Nuclear Motor",
	Research_Discovery: "You improve your grinders efficency with a Tritium powered motor!",
	Research_Influences :'Resource_Scrap',
	Research_Cost_Type :'Resource_Nuclear',
	Research_Cost_Amount : 100,
	Research_Modifer : 25,//OPTIONAL
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Grinder_3)


var Research_Water = { 
	LID :'Research_Water',
	Research_Name:"Automated Water Purifer",
	Research_Discovery: "You can now build water purifiers!",
	Research_Influences :'Resource_Water',
	Research_Cost_Type :'Resource_Scrap',
	Research_Cost_Amount : 25,
	Research_Unlocks_Research :'Research_Water_1',//OPTIONAL
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Water)


var Research_Water_1 = { 
	LID :'Research_Water_1',
	Research_Name:"Purifier Raincatchers",
	Research_Discovery: "You improve your Water purifiers efficency with Rain Catchers!",
	Research_Influences :'Resource_Water',
	Research_Cost_Type :'Resource_Scrap',
	Research_Cost_Amount : 25,
	Research_Modifer : 25,//OPTIONAL
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Water_1)


var Research_Water_2 = { 
	LID :'Research_Water_2',
	Research_Name:"Improvised Purifier Filters",
	Research_Discovery: "You further improve your Water purifiers efficency with salvaged gasmask filters!",
	Research_Influences :'Resource_Water',
	Research_Cost_Type :'Resource_Components', 
	Research_Cost_Amount : 500,
	Research_Modifer : 25,//OPTIONAL
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Water_2)


var Research_Water_3 = { 
	LID :'Research_Water_3',
	Research_Name:"Purifier Fuelwaste liquification",
	Research_Discovery: "You find a way to improve your Water purifiers efficency by using waste byproducts from the Hydrogel refinery!",
	Research_Influences :'Resource_Water',
	Research_Cost_Type :'Resource_Fuel', 
	Research_Cost_Amount : 500,
	Research_Modifer : 25,//OPTIONAL
	Research_Unlocks_Research :'Research_Fuel_3',//OPTIONAL
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Water_3)


var Research_FuelRefinery = { 
	LID :'Research_FuelRefinery',
	Research_Name:"Hydrogel fuel refineries",
	Research_Discovery: "You can now build fuel refineries, turning water into hydrogel fuel!",
	Research_Influences :'Resource_Fuel',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_FuelRefinery)


var Research_Fuel_1 = { 
	LID :'Research_Fuel_1',
	Research_Name:"Refinery High-Pressure valves",
	Research_Discovery: "You've improved your refineries with reinforced valves!",
	Research_Influences :'Resource_Fuel',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,//OPTIONAL
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Fuel_1)


var Research_Fuel_2 = { 
	LID :'Research_Fuel_2',
	Research_Name:"High pressure piping",
	Research_Discovery: "You've improved your refineries efficency with some better piping!",
	Research_Influences :'Resource_Fuel',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,//OPTIONAL
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Fuel_2 )


var Research_Fuel_3 = { 
	LID :'Research_Fuel_3',
	Research_Name:"Refinery/Distillery symbosis",
	Research_Discovery: "You perfect your refineries by distilling most of the byproducts into usable fuel!",
	Research_Influences :'Resource_Fuel',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,//OPTIONAL
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Fuel_3)


var Research_Smelter = { 
	LID :'Research_Smelter',
	Research_Name:"Scrap metal smelting",
	Research_Discovery: "You've discovered ways to extact purified metals from scrap using fuel!",
	Research_Influences :'Resource_Ingots',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Unlocks_Research :'Research_Ingot_1',//OPTIONAL
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Smelter)


var Research_Ingot_1 = { 
	LID :'Research_Ingot_1',
	Research_Name:"Improvised Smelter kilm design",
	Research_Discovery: "You improve your smelters with a better kilm design!",
	Research_Influences :'Resource_Ingots',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,//OPTIONAL
	Research_Unlocks_Research :'Research_Ingot_2',//OPTIONAL
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Ingot_1)


var Research_Ingot_2 = { 
	LID :'Research_Ingot_2',
	Research_Name:"Improvised Firegloves",
	Research_Discovery: "You have crafted yourself some basic heatproof gloves, making smelter operation easier!",
	Research_Influences :'Resource_Ingots',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,
	Research_Unlocks_Research :'Research_Ingot_3',
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Ingot_2)


var Research_Ingot_3 = { 
	LID :'Research_Ingot_3',
	Research_Name:"Idustrial Firegloves",
	Research_Discovery: "You've scavenged some prewar firegloves! No more burnt fingers!",
	Research_Influences :'Resource_Ingots',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Ingot_3)


var Research_Disassembler = { 
	LID :'Research_Disassembler',
	Research_Name:"Salavaged Disassembler",
	Research_Discovery: "You have recovered a prewar recycling device! This will automate the extraction of components from scrap!",
	Research_Influences :'Resource_Components',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Unlocks_Research :'Research_Components_1',
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Disassembler)


var Research_Components_1 = { 
	LID :'Research_Components_1',
	Research_Name:"Disassembler Maintainance",
	Research_Discovery: "You have carefully cleaened and oiled your disassemblers, resulting in smoother operation!",
	Research_Influences :'Resource_Components',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,
	Research_Unlocks_Research :'Research_Components_2',
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Components_1)


var Research_Components_2 = { 
	LID :'Research_Components_2',
	Research_Name:"Disassembler Restoration",
	Research_Discovery: "You've managed to replace most of the worn out the parts from your disassemblers.",
	Research_Influences :'Resource_Components',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,
	Research_Unlocks_Research :'Research_Components_3',
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Components_2)


var Research_Components_3 = { 
	LID :'Research_Components_3',
	Research_Name:"Disassembler Optimization",
	Research_Discovery: "You indepth with your disassemblers allows you to optimize them beyond prewar standards!",
	Research_Influences :'Resource_Components',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Components_3)


var Research_IndustrialNuclear = { 
	LID :'Research_IndustrialNuclear',
	Research_Name:"Tritium Reactor",
	Research_Discovery: "You have found a prewar civilan Tritium reactor! This extracts Tritium from hydrogel fuel!",
	Research_Influences :'Resource_Nuclear',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Unlocks_Research :'Research_Nuclear_1',
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_IndustrialNuclear)


var Research_Nuclear_1 = { 
	LID :'Research_Nuclear_1',
	Research_Name:"Industrial Grade Tritium Reactors",
	Research_Discovery: "You have uncovered the secrets of upgrading your reactors into industrial-grade ones!",
	Research_Influences :'Resource_Nuclear',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,
	Research_Unlocks_Research :'Research_Nuclear_2',
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Nuclear_1)


var Research_Nuclear_2 = { 
	LID :'Research_Nuclear_2',
	Research_Name:"Military Grade Tritium Reactors",
	Research_Discovery: "A chill washes over you as you find military grade reactors likely caused the collapse!",
	Research_Influences :'Resource_Nuclear',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,
	Research_Unlocks_Research :'Research_Nuclear_3',
	Res_BarHeight : 0,
	Research_Status : 0
}
Research.push(Research_Nuclear_2)


var Research_Nuclear_3 = { 
	LID :'Research_Nuclear_3',
	Research_Name:"Self-Sustaining Reactors",
	Research_Discovery: "You've designed a new type of reactor that practically power themselves!",
	Research_Influences :'Resource_Nuclear',
	Research_Cost_Type :'Resource_Scrap', 
	Research_Cost_Amount : 25,
	Research_Modifer : 25,
	Research_Unlocks_Research :'Research_Grinder_3',
	Res_BarHeight : 0,
	Research_Status : 0
} 
Research.push(Research_Nuclear_3)

}