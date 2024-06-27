using CrudApi.Data;
using CrudApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        public readonly StudentContext dbContext;
        public StudentController(StudentContext dbContext)
        {
            this.dbContext = dbContext;

        }
        [HttpGet]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await dbContext.Students.ToArrayAsync();
            return Ok(students);

        }
        [HttpPost]
        public async Task<IActionResult> AddStudent(StudentModel model)
        {
            var addStudent = new Students
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone,
                IsActive = model.IsActive
            };
            await dbContext.Students.AddAsync(addStudent);
            await dbContext.SaveChangesAsync();
            return Ok(addStudent);
        }
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetStudent(Guid id)
        {
            var student = await dbContext.Students.FindAsync(id);
            return Ok(student);

        }
        [HttpPost]
        public async Task<IActionResult> EditStudent( Students model)
        {
            
            var editStudent = await dbContext.Students.FindAsync(model.Id);
                
                if (editStudent is not null)
                { 
                    editStudent.Name = model.Name;
                    editStudent.Email = model.Email;
                    editStudent.Phone = model.Phone;
                    editStudent.IsActive = model.IsActive;
    
                    await dbContext.SaveChangesAsync();
    
                return Ok(editStudent);
                }
            return NotFound("Student Not Found");

        }
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteStudent(Guid id)
        {
            var student = await dbContext.Students.FindAsync(id);
            if (student is not null)
            {
                dbContext.Students.Remove(student);
                await dbContext.SaveChangesAsync();
            }
            return Ok("Deleted SuccessFully...");

        }
    }
}
