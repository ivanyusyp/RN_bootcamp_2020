The Task
Description:
You need to create a page with the list of cars with some additional functionality. Styling
doesn't matter!
Functionality:
- list of cars should be displayed in table layout;
- list should be sortable by clicking on column title. First click - ASC sorting, second click -
DESC sorting;
- user can add new car via form that appears as a modal window;
- user can remove car by clicking "x" button at the end of the table row;
Additional functionality:
- validation

Car entity type:
{
type: "Car" | "Motorcycle";
brand: string;
model: string;
color: string;
}
Initial Data:
const initial = [
{
id: 14,
model: "156",
brand: "Alfa Romeo",
type: "Car",
}, {
id: 17,
model: "206",
brand: "Peugeot",
type: "Car",
},
{
id: 24,
model: "307",
brand: "Peugeot",
type: "Car",
},
{
id: 29,
model: "323",
brand: "Mazda",
type: "Car",
},
{
id: 519,
model: "WR",
brand: "Yamaha",
type: "Motorcycle"
}, {
id: 600,
model: "Raptor",
brand: "Yamaha",
type: "Motorcycle"
}
]