var gameData = {
  staffTypes: {
    graduate: {
      name: 'Graduate Developer',
      salary: 150
    },
    intermediate: {
      name: 'Intermediate Developer',
      salary: 200
    },
    senior: {
      name: 'Senior Developer',
      salary: 300
    }
  },
  perks: {
    coffee: {
      instant: {
        level: 1,
        name: "Free instant coffee",
        cost_fixed_setup: 10,
        cost_fixed_daily: 0,
        cost_per_person_daily: 1
      },
      plunger: {
        level: 2,
        name: "Plunger coffee",
        cost_fixed_setup: 20,
        cost_fixed_daily: 0,
        cost_per_person_daily: 2
      }
    }
  }
}

var gameState = {
  day: 1,
  money: 100000,
  staff: [
    {
      type: "senior",
      name: "Bob",
      salary: 300
    }
  ]
}

var templates = {};

function day() {
  // Pay rent
  gameState.money -= 100;

  // Pay salaries
  $.each(gameState.staff, function(ix, member) {
    gameState.money -= member.salary;
  });

  // Update display
  updateDisplay();
}

function updateDisplay() {
  $('.status').html('Money: $' + gameState.money);

  staff = d3.select(".staff").selectAll(".staff-member")
    .data(gameState.staff);
  staff.enter().append("div");
  staff.attr('class', 'staff-member')
    .html(templates.employee);
  staff.exit().remove();
}

$(function(){
  // Load all templates
  $('script[type="text/x-handlebars-template"]').each(function(ix, template) {
    templates[$(this).data('name')] = Handlebars.compile($(this).html());
  });
  
  updateDisplay();
  window.setInterval(day, 3000);

});
