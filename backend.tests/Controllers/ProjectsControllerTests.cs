using Xunit;
using Moq;
using PortfolioApi.Controllers;
using PortfolioApi.DataAccess;
using PortfolioApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace PortfolioApi.Tests.Controllers
{
    public class ProjectsControllerTests
    {
        [Fact]
        public async Task GetProjects_ReturnsOkResult_WithListOfProjects()
        {
            // Arrange
            var mockDataAccess = new Mock<IDataAccess>();
            var expectedProjects = new List<Project>
            {
                new Project { Id = 1, Title = "Project 1", Description = "Desc 1", ImageUrl = "img1.jpg", ProjectUrl = "url1.com" },
                new Project { Id = 2, Title = "Project 2", Description = "Desc 2", ImageUrl = "img2.jpg", ProjectUrl = "url2.com" }
            };

            mockDataAccess.Setup(repo => repo.GetProjectsAsync())
                          .ReturnsAsync(expectedProjects);

            var controller = new ProjectsController(mockDataAccess.Object);

            // Act
            var result = await controller.GetProjects();

            // Assert
            // Check if the result is an OkObjectResult
            var okResult = Assert.IsType<OkObjectResult>(result.Result);

            // Check if the value returned is the expected list of projects
            var actualProjects = Assert.IsAssignableFrom<IEnumerable<Project>>(okResult.Value);
            Assert.Equal(expectedProjects.Count, actualProjects.Count());
            // Optionally, compare elements if needed, ensuring order or content matches
            Assert.Equal(expectedProjects, actualProjects);

            // Verify that GetProjectsAsync was called exactly once
            mockDataAccess.Verify(repo => repo.GetProjectsAsync(), Times.Once);
        }

        [Fact]
        public async Task GetProjects_ReturnsOkResult_WhenDataAccessReturnsEmptyList()
        {
            // Arrange
            var mockDataAccess = new Mock<IDataAccess>();
            var expectedProjects = new List<Project>(); // Empty list

            mockDataAccess.Setup(repo => repo.GetProjectsAsync())
                          .ReturnsAsync(expectedProjects);

            var controller = new ProjectsController(mockDataAccess.Object);

            // Act
            var result = await controller.GetProjects();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var actualProjects = Assert.IsAssignableFrom<IEnumerable<Project>>(okResult.Value);
            Assert.Empty(actualProjects); // Check if the list is empty
            mockDataAccess.Verify(repo => repo.GetProjectsAsync(), Times.Once);
        }
    }
}
