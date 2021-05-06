---
title: A Study in Poisson - Naive Dart Throwing
description: A look into the most basic algorithm for generating poisson disk distributions.
date: 2021-05-04
language: en_US
stage: 3
featured: true
tags:
  - Algorithms
---
## What is the Poisson Disc Process?

In many programs, we need a way to generate randomly distributed data, also known as noise. One of the most well-known random data signals is called white noise. White noise generation is very simple and performant but often leads to close clusters of points. Upon observing the generated data, these clusters can be quite noticeable and distracting.

<iframe width="100%" height="304" frameborder="0" src="https://observablehq.com/embed/@kbravh/a-study-in-poisson?cells=whiteNoiseChart"></iframe>

An alternative to white noise is blue noise, a type of random data that avoids the clustering phenomenon by adding a simple constraint: any new random point must maintain a minimum distance from all other points. This prevents clusters from forming while still maintaining a random distribution. The poisson disc process is a popular algorithm used to create blue noise.

<iframe width="100%" height="304" frameborder="0" src="https://observablehq.com/embed/@kbravh/a-study-in-poisson?cells=blueNoiseChart"></iframe>

## Poisson Disc Algorithms

There are various algorithms that have been developed for creating poisson disc distributions. In this series, we'll be looking at the following:


- **Naive Dart Throwing**
- **Scalloped Sector** (Dunbar and Humphrey)
- **Heirarchical Dart Throwing** (Cline, Egbert, and White)
- **Fast Poisson Disc Sampling** (Bridson)
- **Modified Bridson** (Roberts)

We'll also take a look at using Spectral Analysis to determine the quality of the blue noise we produce.

## Naive Dart Throwing

The most basic method of generating a poisson disc distribution is known as dart throwing. A random coordinate is picked (as if you had just randomly thrown a dart at a dartboard), and then that point is compared with *all* other points on the graph to see if it maintains a certain minimum distance from them. If the new point crosses that distance threshold with any other point, it is disqualified and a new point is generated.

<iframe width="100%" height="334" frameborder="0" src="https://observablehq.com/embed/@kbravh/a-study-in-poisson?cells=viewof+replay%2CdartThrowingChart"></iframe>

There are a couple of problems with this "naive" approach.
- The process will get slower and slower as more points are added
- There are plenty of points that are checked that are nowhere near our point in question
- We do not know when/if we have a **maximal** set of points (points that completely fill the graph)

### Algorithm Inefficiency

The issue of slowness is a fundamental flaw of this algorithm. In Big O notation, this algorithm has a running time of O(n²). That means that as the number of points increases, the worst-case time to run the algorithm increases exponentially.

One of the major causes of this inefficiency is that the algorithm has to compare our new point to every single point that exists so far, even if they're nowhere nearby. Visually, we can clearly see which points are close enough to be of concern. The dart-throwing algorithm, though, only has a list of all points that exist. It would need some sort of secondary data structure to keep track of point locations relative to each other, rather than just the order they happened to be created.

Another issue is that new points are created entirely at random. If there were a way to keep track of any empty space available, we could limit our point creation to those areas.

### Algorithm Convergence

With dart throwing, there isn't a clean-cut way to know if our data set is full and without gaps, but we can try to approximate. In order to approach a maximal set of data points with dart throwing, we can set an **error threshold**.

We let the algorithm try to create new random data points. Each time it fails, it will count the number of consecutive errors that have occurred. If we successfully place a new point, we'll reset our error count. But if the number of consecutive errors reaches the threshold, the algorithm will stop execution.

A low threshold will leave more gaps in our graph but will execute more quickly. The higher we raise our threshold, the closer we come to a maximal data set, but at the cost of execution time.

Feel free to edit the parameters for the following dart throwing implementation and see how the data generation changes. The error threshold bar at the bottom of the field will show how close the algorithm is to meeting the error limit and ending execution.

<iframe width="100%" height="770" frameborder="0" src="https://observablehq.com/embed/@kbravh/a-study-in-poisson?cells=viewof+replay2%2Cchart%2Cviewof+threshold%2Cviewof+radius%2Cviewof+pointRadius"></iframe>

## Conclusion
The naive dart throwing algorithm for generating blue noise is a good first step for understanding blue noise generation, but due to its potential for long execution time, especially with large data sets, it would be a good idea to use one of the newer, more efficient algorithms that we'll be studying.

In the next part of this series we'll take a look at the scalloped sector algorithm, one of the earlier improvements made to this process back in 2006. I look forward to seeing you there!