select defects.id, count(records.id) from defects left join records 
on defects.id = records.defect_id 

group by defects.id order by defects.id

select count(*) 
from flats inner join flat_structures 
on flats.id = flat_structures.flat_id 
inner join spaces on spaces.id = flat_structures.space_id 
inner join features on spaces.id = features.space_id 
inner join defects on features.id = defects.feature_id 
where flats.id = 1;

with a as (
    
select features.id, defects.id, count(records.id) 
from flats inner join flat_structures 
on flats.id = flat_structures.flat_id 
inner join spaces on spaces.id = flat_structures.space_id 
inner join features on spaces.id = features.space_id 
inner join defects on features.id = defects.feature_id 
left join records on defects.id = records.defect_id 
where flats.id = 1 and space_id = 1 
group by defects.id 
having count(records.id) > 1
order by defects.id;

)
select count(*) from a;

select * from records where defect_id = 6;

[
    {
        feature_id: 
        feature_name
        defects: []
    }
]