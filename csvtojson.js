	var fs=require('fs');
	var inputstream=fs.createReadStream('datasource/FoodFacts.csv');
	var data="";
	var obj={};
	inputstream.on('data', function(line) {
		data+=line;
	});
	inputstream.on('end', function() {
		var noofrecords = data.split("\n"),
		nameofheaders = noofrecords[0].split(","),
		index_country = nameofheaders.indexOf("countries_en"),
		index_salt = nameofheaders.indexOf("salt_100g"),
		index_sugar = nameofheaders.indexOf("sugars_100g"),
		salt_sugar_consp = [],
		country_Array = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'],
		saltArray = new Uint8Array(9);
		sugarArray = new Uint8Array(9);
					
					var index_protein = nameofheaders.indexOf("proteins_100g"),
							index_carbohydrate = nameofheaders.indexOf("carbohydrates_100g"),
							index_fat = nameofheaders.indexOf("fat_100g"),
							country_Array_NorthEurope = ['United Kingdom', 'Denmark', 'Sweden','Norway'],
							country_Array_CentralEurope = ['France', 'Belgium', 'Germany', 'Switzerland','Netherlands'],
							country_Array_SouthEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia','Albania'],
							fat_protein_carbohydrate_consp=[],
							fat_North=0,
							protein_North=0,
							carbohydrate_North=0,
							fat_Central=0,
							protein_Central=0,
							carbohydrate_Central=0,
							fat_South=0,
							protein_South=0,
							carbohydrate_South=0,
							fat,
							protein,
							carbohydrate,
							checkcountryavailable;
							for(let i=0;i<noofrecords.length;i++)
								{
								var temprecord=noofrecords[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
								checkcountryavailable=country_Array.includes(temprecord[index_country]);
								if(checkcountryavailable)
								{
									var index = country_Array.indexOf(temprecord[index_country]);
									var salt = temprecord[index_salt];
									var sugar=temprecord[index_sugar];
									if(salt == "")
										salt=0;
									if(sugar == "")
										sugar=0;
								saltArray[index] = saltArray[index]+parseFloat(salt);
									sugarArray[index] = sugarArray[index]+parseFloat(sugar);
									checkcountryavailable = false;
								}
								checkcountryavailable=country_Array_NorthEurope.includes(temprecord[index_country]);
								if(checkcountryavailable)
								{
									fat = temprecord[index_fat];
									protein=temprecord[index_protein];
									carbohydrate=temprecord[index_carbohydrate];
									if(fat=="")
										fat=0;
									if(carbohydrate=="")
										carbohydrate=0;
									if(protein=="")
										protein=0;
									fat_North+=parseFloat(fat);
									carbohydrate_North+=parseFloat(carbohydrate);
									protein_North+=parseFloat(protein);
									checkcountryavailable = false;
								}
								checkcountryavailable=country_Array_CentralEurope.includes(temprecord[index_country]);
								if(checkcountryavailable)
								{
									fat = temprecord[index_fat];
									protein=temprecord[index_protein];
									carbohydrate=temprecord[index_carbohydrate];
									if(fat=="")
										fat=0;
									if(carbohydrate=="")
										carbohydrate=0;
									if(protein=="")
										protein=0;
									fat_Central+=parseFloat(fat);
									carbohydrate_Central+=parseFloat(carbohydrate);
									protein_Central+=parseFloat(protein);
									checkcountryavailable = false;
								}
								checkcountryavailable=country_Array_SouthEurope.includes(temprecord[index_country]);
								if(checkcountryavailable)
								{
									fat = temprecord[index_fat];
									protein=temprecord[index_protein];
									carbohydrate=temprecord[index_carbohydrate];
									if(fat=="")
										fat=0;
									if(carbohydrate=="")
										carbohydrate=0;
									if(protein=="")
										protein=0;
									fat_South+=parseFloat(fat);
									carbohydrate_South+=parseFloat(carbohydrate);
									protein_South+=parseFloat(protein);
									checkcountryavailable = false;
								}

					}
					for(var i=0;i<country_Array.length;i++)
					{
						var object = {};
						object["countryname"] = country_Array[i];
						object["saltconsumption"] = saltArray[i];
						object["sugarconsumption"] = sugarArray[i];
						salt_sugar_consp.push(object);
					}
					var obj={};
					obj["country"] = "NorthEurope";
					obj["Fat"] = fat_North;
					obj["Protien"] = protein_North;
					obj["Carbohydrates"] = carbohydrate_North;
					fat_protein_carbohydrate_consp.push(obj);

					obj={};
					obj["country"] = "CentralEurope";
					obj["Fat"] = fat_Central;
					obj["Protien"] = protein_Central;
					obj["Carbohydrates"] = carbohydrate_Central;
					fat_protein_carbohydrate_consp.push(obj);

					obj={};
					obj["country"] = "southEurope";
					obj["Fat"] = fat_South;
					obj["Protien"] = protein_South;
					obj["Carbohydrates"] = carbohydrate_South;
					fat_protein_carbohydrate_consp.push(obj);
					fs.writeFile('outputJSON/saltsugarconsumption.json', JSON.stringify(salt_sugar_consp) , 'utf-8');
					fs.writeFile('outputJSON/fatproteincarbohydrateconsumption.json', JSON.stringify(fat_protein_carbohydrate_consp) , 'utf-8');

				});