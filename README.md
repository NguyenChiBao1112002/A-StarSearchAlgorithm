# Visualize The A* Search Algorithm  

**The project visualizes the A\* algorithm with the problem of finding a path in a maze.**

> [!Tip]
> **You can clone the project and run it in Visual Studio Code <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/768px-Visual_Studio_Code_1.35_icon.svg.png" width="30" height="30" /> 
 (very easy honey 😂😘😍).**


## **<img src="https://raw.githubusercontent.com/my-badges/my-badges/master/badges/public-keys/public-keys-1.png" width="40">Pseudo Code:**
```yaml
function A_Star(start, goal)
    open_set = priority_queue()
    closed_set = empty_set()

    g_score[start] = 0
    h_score[start] = heuristic(start, goal)
    f_score[start] = g_score[start] + h_score[start]

    open_set.push(start, f_score[start])

    while open_set is not empty
        current = open_set.pop()

        if current == goal
            return reconstruct_path(came_from, current)

        closed_set.add(current)

        for each neighbor in neighbors(current)
            if neighbor in closed_set
                continue

            tentative_g_score = g_score[current] + distance(current, neighbor)

            if neighbor not in open_set
                open_set.push(neighbor, tentative_g_score)

            if tentative_g_score >= g_score[neighbor]
                continue

            came_from[neighbor] = current
            g_score[neighbor] = tentative_g_score
            h_score[neighbor] = heuristic(neighbor, goal)
            f_score[neighbor] = g_score[neighbor] + h_score[neighbor]

            open_set.update_priority(neighbor, f_score[neighbor])
    return failure

function reconstruct_path(came_from, current)
    total_path = [current]
    while current in came_from
        current = came_from[current]
        total_path.prepend(current)
    return total_path
```


## **<img src="https://camo.githubusercontent.com/01132a59351b6e9b4ad63d44c22a20b44913b55598dc8b6a9d9f6d3cefaa7401/68747470733a2f2f6d792d6261646765732e6769746875622e696f2f6d792d6261646765732f636166652d636f6d6d69742e706e67" width="40">Example:**
![image](https://github.com/user-attachments/assets/0f24590d-38db-454b-876a-05fb2441be3b)




