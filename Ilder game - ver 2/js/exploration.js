//EXPLORE SYSTEM BACK END HYPER FILE//
//BLESS THIS MESS

//to be unlocked
//	Water, Fuel, Ingots, Components, Nuclear. 
//	Three tiers of each + scrap

Explorationmode = 0
storyactive = 0;
currentstate = 1;
Endgame_state = 0;
EndGame = 'Congrads. You have explored everything. This is the end of the current plotline'
var Exp=[]

//Safehouse story # gets bike.
//Unlocks: Water, Fuel, Water_t1, Fuel_t1, Scrap_t1
var Safehouse={
	Exp_Name: 'Exploring the safehouse',
	Discovered: 1,
	BarHeight: 0,
	Fuel_Cost: 0,
	States: 2,
	Sta_1: {
		Text: 'As you come to, you are met by a dark damp room and/n a nasty throbbing headache./n /n You sit up in shock but feel strangely at home./n /n What do you do?', 
		Opts: 3,
		Opt_1: {
			Button_Text : 'Search for a light switch',
			Story_Text : 'You stroke the walls for a bit when suddenly the room lights up./n It would appear the lights are motion activated.', 
			Outcome: 'Progress'
		},
		Opt_2: {
			Button_Text: 'Wait for your eyes to adjust',
			Story_Text: 'Just as your eyes start to adjust, the lights suddenly flick on./n Seems they are motion activated',
			Outcome: 'Progress'
		},
		Opt_3: {
			Button_Text:'Just panic',
			Story_Text: 'You feel overcome with fear!/n You start to hyperventilate and scramble to your feet./n /n This, fortunately, activates the motion senstive lights.',
			Outcome: 'Progress'
		},
	},
	Sta_2: {
		Text: 'You seem to be in a doomsday preppers bunker or something./n  Precious supplies are stacked up high against the wall, and/n a sheet of blue tarpaulin has been draped over something/n in the middle of the room...',
		Opts: 1,		
		Opt_1: {
			Button_Text : 'Lift the Tarp',
			Story_Text : 'You pull the dusty tarp away to reveal a prestine moped!/n You give it a once over and find its in great shape./n Now, if only you had some hydrofuel.../n /n Luckily, You think you remember how to build a Hydrofuel/n  distillery, and with a bit of scrap you should/n be able to research water and/n hydrofuel production.',
			Outcome : 'Progress',
		},
	},
	Rewards_Research: ['Research_Grinder_1', 'Research_Water', 'Research_Water_1', 'Research_FuelRefinery', 'Research_Fuel_1']
	}
Exp.push(Safehouse);


//The watchpost # finds map, unlocks ingots, water and fuel upgrades t2
//Unlocks: Ingots, Ingots_t1, Water_t2, Fuel_t2

var Watchtower={
	Exp_Name: 'Exploring the abandoned checkpoint',
	Discovered: 0,
	BarHeight: 0,
	Fuel_Cost: 10,
		States: 2,
	Sta_1 : { 
		Text : 'As you travel up the dusty road, you see what/n appears to be a massive wall!/n It streaches out as far as you can see./n At the point where the wall meets the road,/n there appears to be a checkpoint./n /n As you draw closer towards it,/n you notice that it is surrounded by autoturrets!/n They seem to be staring vacantly into the wasteland for now,/n  but you pause to weigh up your options...',
		Opts: 3,	
		Opt_1: {
			Button_Text : 'Floor it through the gate!',
			Story_Text : "You floor it towards the checkpoint!/n As you do, one of the turrets takes aim at you./n You grit your teeth, hoping it will miss.../n /n *CLICK-CLICK-CLICK*!/n /n Seems it's out of ammo!/n You drive past it and enter the checkpoint.", 
			Outcome : 'Progress'
		},
		Opt_2: {
		Button_Text : 'Slowly apporach the gate',
		Story_Text : 'You decide to slowly approach the checkpoint./n Some of the turrets lazily follow your movement but/n otherwise do nothing./n /n Once you pass the gate, they turn back towards the desert.',
		Outcome :'Progress'
		},
		Opt_3: {
		Button_Text : 'Avoid it and take a detour',
		Story_Text : 'You decide its not worth the risk and head off road./n You follow the wall for a few hours but it seems to never end./n Confounded, You turn back when your fuel starts to get low.', 
		Outcome : 'Failure'
		},
	},
	Sta_2: {
		Text :"Once you're past the gate, you find that the checkpoint/n is deserted, save for the rusty autoturrets./n Most of them appear to be busy scanning the desert horizon./n Strangely, however, you spot two further in that appear to/n be trying to fire at one another. The muffled clicking of their/n empty guns is all that breaks the otherwise dead silence here./n You wonder to yourself how long they've held this grudge/n against each other as you hop off your moped and look around", 
		Opts: 2,
		Opt_1 : {
			Button_Text : 'Crowbar the storerooms!',
			Story_Text :  'It took you an hour to crowbar one of the/n storerooms open, only to find it was looted/n years ago!/n /n With the sun now setting, you decide to/n cut your losses and head home',
			Outcome :  'Failure'
		},
		Opt_2: { 
			Button_Text : 'Try to open a random safe',
			Story_Text :  'uhhh... Look, I dont know but you/n find a book on ingot casters inside.../n /n Cut me some slack, Im on a deadline here',
			Outcome : 'Progress'
		},
	},
	Rewards_Research: ['Research_Smelter', 'Research_Ingot_1', 'Research_Water_1', 'Research_Fuel_1']
}
Exp.push(Watchtower);

//The Hospital # Unlocks components, water and fuel upgrades t3
//Unlocks: Components, Ingots_t2-3, Water_t3, Fuel_t3, Scrap_t2

var Hospital={
	Exp_Name: 'Exploring the field hospital',
	Discovered: 0,
	BarHeight: 0,
	Fuel_Cost: 50,
	States: 2,
	Sta_1: {
		Text : 'Hospital_State_1 - all states will be like this until I patch them because writing story is hard',
		Opts: 1,	
		Opt_1 : { 
			Button_Text : 'Option_a',
			Story_Text :  'Progress',
			Outcome : 'Progress'
		},
	},
	Sta_2: { 
		Text : 'Hospital_State_2',
		Opts: 1,
		Opt_1 : { 
			Button_Text :  'Option_a',
			Story_Text :  'Progress',
			Outcome :'Progress'
		},
	},
	Rewards_Research: ['Research_Disassembler', 'Research_Components_1', 'Research_Components_2', 'Research_Components_3', 'Research_Ingot_2','Research_Ingot_3', 'Research_Fuel_3','Research_Water_3', 'Research_Grinder_2']
}
Exp.push(Hospital);

//The Base # Unlocks nuclear
//Unlocks: Nuclear, Nuclear_t1-3, Scrap_t3, 

var Bunker={
	Exp_Name: 'Exploring the hidden bunker',
	Discovered: 0,
	BarHeight: 0,
	Fuel_Cost: 100,
	States: 2,
	Sta_1: {
		Text : 'Nuclear_State_1',
		Opts: 1,	
		Opt_1 : { 
			Button_Text : 'Option_a',
			Story_Text :  'Progress',
			Outcome : 'Progress'
		},
	},
	Sta_2: { 
		Text : 'Nuclear_State_2',
		Opts: 1,
		Opt_1 : { 
			Button_Text :  'Option_a',
			Story_Text :  'Progress',
			Outcome :'Progress'
		},
	},
	
	Rewards_Research: ['Research_IndustrialNuclear','Research_Nuclear_1', 'Research_Nuclear_2','Research_Nuclear_3', 'Research_Grinder_3']
}
Exp.push(Bunker);

//The Beacon # Resets game, gives 'victory' modifier. 
//Unlocks: Story end

var Beacon={
	Exp_Name: 'Reaching the Great Beacon',
	Discovered: 0,
	BarHeight: 0,
	Fuel_Cost: 500,
	States: 1,
	Sta_1: {
		Text : 'Beacon_State_1',
		Opts: 1,	
		Opt_1 : { 
			Button_Text : 'Option_a',
			Story_Text :  'Progress',
			Outcome : 'Progress'
		},
	},
	Rewards_Research: ['Endgame'] //This fires the end game text. 
}
Exp.push(Beacon);

