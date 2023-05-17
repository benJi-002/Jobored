import { useState, useEffect } from "react";

import { Skeleton } from "@mantine/core";

const SkeletonFrame = (props) => {

    const [skeletCount, setSkeletCount] = useState(4);
    
    useEffect(() => {
        setSkeletCount(skeletCount => props.count)
    }, [])

    const items = [];

    for (let index = 0; index < skeletCount; index++) {
        items[index] = 
        <li 
        className="job__item"
        key={index + 1}
        >
            <Skeleton height={8} mt={8} width="35%" radius="xl" />
            <Skeleton height={8} mt={24} width="60%" radius="xl" />
            <Skeleton height={8} mt={24} width="15%" radius="xl" />
        </li>
    }

    return items;
}

export default SkeletonFrame;